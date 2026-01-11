
import { Telegraf } from 'telegraf';

interface TelegramMessage {
  postId: string;
  name: string;
  content: string;
  email?: string;
}

// Escape special characters for Markdown
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
    });

    console.log('Telegram notification sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return false;
  }
}
