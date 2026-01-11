
import { Telegraf } from 'telegraf';

interface TelegramMessage {
  commentId: string;
  postId: string;
  name: string;
  content: string;
  email?: string;
}

// Escape special characters for MarkdownV2
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}

// Get environment variable - works in both dev and production
function getEnv(key: string): string | undefined {
  // In production (Vercel), use process.env; in dev, use import.meta.env
  if (import.meta.env.PROD) {
    return process.env[key];
  }
  return import.meta.env[key] as string | undefined;
}

export async function sendTelegramNotification(message: TelegramMessage): Promise<boolean> {
  const botToken = getEnv('TELEGRAM_BOT_TOKEN');
  const chatId = getEnv('TELEGRAM_CHAT_ID');

  console.log('[Telegram] Attempting to send notification...');
  console.log('[Telegram] Bot token exists:', !!botToken);
  console.log('[Telegram] Chat ID exists:', !!chatId);

  if (!botToken || !chatId) {
    console.warn('[Telegram] Credentials not configured. Skipping notification.');
    console.warn('[Telegram] Missing:', !botToken ? 'TELEGRAM_BOT_TOKEN' : '', !chatId ? 'TELEGRAM_CHAT_ID' : '');
    return false;
  }

  try {
    const bot = new Telegraf(botToken);

    const text = `🆕 *New Comment on Blog*

📝 *Post:* ${escapeMarkdown(message.postId)}
👤 *From:* ${escapeMarkdown(message.name)}${message.email ? ` \\(${escapeMarkdown(message.email)}\\)` : ''}

💬 *Comment:*
${escapeMarkdown(message.content)}

⏳ _Awaiting approval_`;

    await bot.telegram.sendMessage(chatId, text, {
      parse_mode: 'MarkdownV2',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ Approve', callback_data: `approve:${message.commentId}` },
            { text: '❌ Reject', callback_data: `reject:${message.commentId}` },
          ],
          [
            { text: '🗑️ Delete', callback_data: `delete:${message.commentId}` },
          ],
        ],
      },
    });

    console.log('[Telegram] Notification sent successfully');
    return true;
  } catch (error) {
    console.error('[Telegram] Failed to send notification:', error);
    return false;
  }
}

// Get bot instance for webhook handling
export function getTelegramBot(): Telegraf | null {
  const botToken = getEnv('TELEGRAM_BOT_TOKEN');
  if (!botToken) return null;
  return new Telegraf(botToken);
}
