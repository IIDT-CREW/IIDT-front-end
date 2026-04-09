import type { Metadata } from 'next'
import Main from '@/views/Main'
import { DEFAULT_META, SITE_NAME, SITE_URL, getCustomMeta } from '@/config/constants/meta'

const meta = getCustomMeta('/main')

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title || DEFAULT_META.title,
    description: meta.description || DEFAULT_META.description,
    siteName: SITE_NAME,
    type: 'website',
    url: SITE_URL ? `${SITE_URL}/main` : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title || DEFAULT_META.title,
    description: meta.description || DEFAULT_META.description,
  },
}

const MainPage = () => {
  return <Main />
}

export default MainPage
