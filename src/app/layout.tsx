import Navbar from '@/components/Navbar'
import Provider from '@/components/Provider'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Empresa',
  description:
    'Projeto realizado para cumprir o desafio da aula | Desenvolvimento de Produtos de Software I',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className="flex h-screen flex-col items-center justify-center">
            <Navbar />
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
