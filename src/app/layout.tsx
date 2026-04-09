import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import 'aos/dist/aos.css'
import '@/style/index.css'
import '@/style/custom-react-toastify.css'
import Providers from './providers'
import AppShell from './app-shell'
import { DEFAULT_META, SITE_NAME, SITE_URL } from '@/config/constants/meta'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: DEFAULT_META.title,
  description: DEFAULT_META.description,
  openGraph: {
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ko">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link href="https://fonts.googleapis.com/css?family=Nanum+Myeongjo&display=swap" rel="stylesheet" />
        <script type="text/javascript" src="https://developers.kakao.com/sdk/js/kakao.min.js" />
      </head>
      <body>
        <Script
          async
          id="Adsense-id"
          data-ad-client="ca-pub-1105069678419099"
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`} />
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
        <div id="portal-root" />
      </body>
    </html>
  )
}

export default RootLayout
