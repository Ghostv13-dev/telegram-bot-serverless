import { api } from 'sdk';
import { getMemory, rememberMessage, saveNote } from '../lib/memory.js';

export default async function (message) {
  if (!message.chat?.id) return;

  const text = message.text?.trim() ?? '';
  const memory = await rememberMessage(message);

  if (text === '/start') {
    await api.sendMessage({
      chat_id: message.chat.id,
      text: 'Welcome. This bot is ready to customize. Send /help to see the starter commands.',
    });
    return;
  }

  if (text === '/help') {
    await api.sendMessage({
      chat_id: message.chat.id,
      text: '/remember <text> — save a small note\n/memory — show saved information\n/help — show this help',
    });
    return;
  }

  if (text.startsWith('/remember ')) {
    const note = text.slice('/remember '.length).trim().slice(0, 500);
    if (!note) return;
    await saveNote(message.chat.id, note);
    await api.sendMessage({ chat_id: message.chat.id, text: 'Saved.' });
    return;
  }

  if (text === '/memory') {
    const current = await getMemory(message.chat.id);
    await api.sendMessage({
      chat_id: message.chat.id,
      text: current?.note
        ? `Saved note: ${current.note}\nMessages seen: ${current.messageCount}`
        : `No note saved yet. Messages seen: ${current?.messageCount ?? memory.messageCount}`,
    });
    return;
  }

  if (text) {
    await api.sendMessage({
      chat_id: message.chat.id,
      text: `Received: ${text.slice(0, 300)}\n\nThis starter handler has seen ${memory.messageCount} message(s) in this chat.`,
    });
  }
}
