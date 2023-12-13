import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'eSport Coach',
  description: 'Get professional coaching',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
            <main className="">{children}</main>
          </StoreProvider>
        </body>
    </html>
  )
}
