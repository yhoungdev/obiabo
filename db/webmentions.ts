import { defineTable, column } from 'astro:db';

export const webmentions = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    postId: column.text(),
    source: column.text(), // URL that mentioned you
    author: column.text({ optional: true }), // Name of who mentioned you
    authorUrl: column.text({ optional: true }), // URL of author
    authorImage: column.text({ optional: true }), // Avatar
    type: column.text(), // 'mention', 'reply', 'like', 'repost'
    content: column.text({ optional: true }), // Text content
    published: column.date({ optional: true }),
    createdAt: column.date(),
  }
});
