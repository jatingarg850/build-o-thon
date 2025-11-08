import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import DndWrapper from '@/components/DndWrapper'
import Providers from '@/components/Providers'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChemLab Online - Virtual Chemistry Laboratory',
  description: 'Interactive virtual chemistry lab for qualitative inorganic salt analysis',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ChemLab',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>
            <DndWrapper>
              <Navigation />
              {children}
            </DndWrapper>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}