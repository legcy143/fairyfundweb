import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/local/Navbar'
import { Provider } from './Provider'


export const metadata: Metadata = {
  title: 'fairfunds',
  description: 'fairy funds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body>
        <Provider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className='max-w-[100rem] mx-auto space-y-4'>
          <Navbar />
          {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
