import './globals.css'
import { Nunito } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/context/ThemeContext'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Skirr',
  description: 'A blog built with Next.js, TypeScript, and Sanity CMS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
      </head>
      <body className={`${nunito.className} flex flex-col min-h-screen`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
