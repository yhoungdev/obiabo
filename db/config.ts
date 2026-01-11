import { defineDb, defineTable, column } from 'astro:db';

export const reactions = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    postId: column.text({ indexed: true }),
    emoji: column.text(),
    sessionId: column.text(),
    createdAt: column.date({ default: new Date() }),
  },
});

export const comments = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    postId: column.text({ indexed: true }),
    name: column.text(),
    email: column.text({ optional: true }),
    content: column.text(),
    approved: column.boolean({ default: false }),
    sessionId: column.text(),
    createdAt: column.date({ default: new Date() }),
  },
});

export default defineDb({
  tables: { reactions, comments },
});
