// Removes the webhook (e.g. before switching back to long polling).
const token = Deno.env.get("BOT_TOKEN");
if (!token) {
  console.error("Set BOT_TOKEN in .env first.");
  Deno.exit(1);
}
const res = await fetch(`https://api.telegram.org/bot${token}/deleteWebhook`, { method: "POST" });
console.log(await res.json());

export {};
