import { table, integer, text, sql } from 'sdk/db';

export const chatMemory = table('chat_memory', {
  chatId: integer('chat_id').primaryKey(),
  displayName: text('display_name'),
  note: text('note'),
  messageCount: integer('message_count').notNull().default(0),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});
