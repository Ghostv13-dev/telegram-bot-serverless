import { db } from 'sdk';
import { eq, sql } from 'sdk/db';
import { chatMemory } from '../schema.js';

export async function rememberMessage(message) {
  const chatId = message.chat.id;
  const displayName = message.from?.first_name ?? message.chat.title ?? 'Telegram user';
  const [row] = await db.insert(chatMemory)
    .values({ chatId, displayName, messageCount: 1 })
    .onConflictDoUpdate({
      target: chatMemory.chatId,
      set: {
        displayName,
        messageCount: sql`${chatMemory.messageCount} + 1`,
        updatedAt: sql`(unixepoch())`,
      },
    })
    .returning()
    .run();
  return row;
}

export async function saveNote(chatId, note) {
  await db.insert(chatMemory)
    .values({ chatId, note, messageCount: 0 })
    .onConflictDoUpdate({ target: chatMemory.chatId, set: { note, updatedAt: sql`(unixepoch())` } })
    .run();
}

export async function getMemory(chatId) {
  const [row] = await db.select().from(chatMemory).where(eq(chatMemory.chatId, chatId)).limit(1).run();
  return row ?? null;
}
