import type { APIRoute } from 'astro';
import { db, eq, comments } from 'astro:db';
import { Telegraf } from 'telegraf';

export const POST: APIRoute = async ({ request }) => {
  const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
  
  if (!botToken) {
    return new Response(JSON.stringify({ error: 'Bot not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const update = await request.json();
    
    
    if (update.callback_query) {
      const callbackQuery = update.callback_query;
      const data = callbackQuery.data;
      const chatId = callbackQuery.message?.chat?.id;
      const messageId = callbackQuery.message?.message_id;
      
      if (!data || !chatId || !messageId) {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const [action, commentId] = data.split(':');
      const bot = new Telegraf(botToken);

      try {
        let responseText = '';
        
        switch (action) {
          case 'approve':
            await db.update(comments)
              .set({ approved: true })
              .where(eq(comments.id, commentId));
            responseText = '✅ Comment approved!';
            break;
            
          case 'reject':
            await db.update(comments)
              .set({ approved: false })
              .where(eq(comments.id, commentId));
            responseText = '❌ Comment rejected!';
            break;
            
          case 'delete':
            await db.delete(comments).where(eq(comments.id, commentId));
            responseText = '🗑️ Comment deleted!';
            break;
            
          default:
            responseText = '❓ Unknown action';
        }

        
        await bot.telegram.answerCbQuery(callbackQuery.id, responseText);

        
        const originalText = callbackQuery.message?.text || '';
        const updatedText = originalText.replace('⏳ _Awaiting approval_', `${responseText}`);
        
        await bot.telegram.editMessageText(
          chatId,
          messageId,
          undefined,
          updatedText,
          { parse_mode: 'MarkdownV2' }
        );

        
        await bot.telegram.editMessageReplyMarkup(chatId, messageId, undefined, {
          inline_keyboard: [],
        });

      } catch (dbError) {
        console.error('Database operation failed:', dbError);
        await bot.telegram.answerCbQuery(callbackQuery.id, '❌ Operation failed!');
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};


export const GET: APIRoute = async ({ request }) => {
  const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
  const url = new URL(request.url);
  const setupKey = url.searchParams.get('setup');
  const adminSecret = import.meta.env.ADMIN_SECRET || 'admin123';

  
  if (setupKey !== adminSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!botToken) {
    return new Response(JSON.stringify({ error: 'Bot token not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const bot = new Telegraf(botToken);
    const webhookUrl = `${url.origin}/api/telegram/webhook`;
    
    await bot.telegram.setWebhook(webhookUrl);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Webhook set successfully',
      webhookUrl 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: 'Failed to set webhook', details: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
