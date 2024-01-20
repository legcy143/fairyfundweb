import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/local/Navbar'
import { Provider } from './Provider'
import { useAuth } from '@/store/useAuth'


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
      <body suppressHydrationWarning={true}>
        <Provider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className='w-full max-w-[100rem] mx-auto h-[100vh] flex flex-col'>
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
