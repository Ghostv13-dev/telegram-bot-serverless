import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Telegram Serverless Bot",
  description: "Reusable Telegram bot template powered by Telegram Serverless.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
