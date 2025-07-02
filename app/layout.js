import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Toaster } from 'sonner'
import AuthProvider from '../components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ReezBlank - Premium Fashion',
  description: 'Discover premium fashion and clothing at ReezBlank. Modern, elegant, and sustainable fashion for the discerning individual.',
  keywords: 'fashion, clothing, premium, sustainable, modern',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-cream flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}