/// <reference path="../.astro/types.d.ts" />

// Node.js process.env types for Vercel runtime
declare namespace NodeJS {
  interface ProcessEnv {
    TELEGRAM_BOT_TOKEN?: string;
    TELEGRAM_CHAT_ID?: string;
    ADMIN_SECRET?: string;
  }
}
