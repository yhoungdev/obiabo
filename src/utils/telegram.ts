
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

export async function sendTelegramNotification(message: TelegramMessage): Promise<boolean> {
  const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram credentials not configured. Skipping notification.');
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

    console.log('Telegram notification sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return false;
  }
}

// Get bot instance for webhook handling
export function getTelegramBot(): Telegraf | null {
  const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) return null;
  return new Telegraf(botToken);
}
