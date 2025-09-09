import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FluentUIProvider } from "@/components/providers/fluent-provider"
import { SyncfusionThemeProvider } from "@/components/providers/syncfusion-theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Syncfusion Document Editor",
  description: "A powerful document editor built with Syncfusion, Next.js, Tailwind CSS, shadcn/ui, and Fluent UI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SyncfusionThemeProvider>
          <FluentUIProvider>
            {children}
          </FluentUIProvider>
        </SyncfusionThemeProvider>
      </body>
    </html>
  )
}