import Home from '@/views/Home'
import { DEFAULT_META, SITE_NAME, SITE_URL, getCustomMeta } from '@/config/constants/meta'
import type { Metadata } from 'next'

const meta = getCustomMeta('/')

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title || DEFAULT_META.title,
    description: meta.description || DEFAULT_META.description,
    siteName: SITE_NAME,
    type: 'website',
    url: SITE_URL || undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title || DEFAULT_META.title,
    description: meta.description || DEFAULT_META.description,
  },
}

const HomePage = () => {
  return <Home />
}

export default HomePage
