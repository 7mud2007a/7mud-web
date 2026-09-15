import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/main/navbar'
import { AmbientBackground } from '@/components/main/ambient-background'
import { ThemeProvider } from '@/context/theme-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daniel — Web Developer & Website Creator',
  description: 'Personal portfolio for Daniel, a modern website developer and website creator crafting custom digital experiences.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-soft-bg dark:bg-dark-bg text-slate-900 dark:text-slate-100 overflow-x-hidden antialiased selection:bg-purple-200 dark:selection:bg-purple-900 selection:text-purple-900 dark:selection:text-purple-200 transition-colors duration-300`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider>
          <AmbientBackground />
          <Navbar />
          <main className="relative z-10 w-full overflow-hidden">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
