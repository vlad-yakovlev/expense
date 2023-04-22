import { DocumentProps, Head, Html, Main, NextScript } from 'next/document.js'
import { FC } from 'react'

export const MyDocument: FC<DocumentProps> = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icons/maskable_icon_x512.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#16a34a" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="description" content="Expense Tracker" />
      </Head>

      <body className="bg-zinc-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
