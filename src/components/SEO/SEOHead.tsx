'use client'

import Head from 'next/head'
import { DEFAULT_META, getCustomMeta, SITE_NAME, SITE_URL } from 'config/constants/meta'
import { useCurrentHref, useCurrentPath } from '@/hooks/useCurrentPath'

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  noindex?: boolean
}

const SEOHead = ({ title, description, image, noindex }: SEOHeadProps) => {
  const pathname = useCurrentPath()
  const asPath = useCurrentHref()

  const pageMeta = getCustomMeta(pathname)
  const resolvedTitle = title || pageMeta.title || DEFAULT_META.title
  const resolvedDescription = description || pageMeta.description || DEFAULT_META.description
  const resolvedImage = image || pageMeta.image || DEFAULT_META.image
  const fullImageUrl = resolvedImage?.startsWith('http') ? resolvedImage : `${SITE_URL}${resolvedImage}`
  const canonicalUrl = `${SITE_URL}${asPath}`

  return (
    <Head>
      <title key="title">{resolvedTitle}</title>
      <meta key="description" name="description" content={resolvedDescription} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta key="og:title" property="og:title" content={resolvedTitle} />
      <meta key="og:description" property="og:description" content={resolvedDescription} />
      <meta key="og:image" property="og:image" content={fullImageUrl} />
      <meta key="og:url" property="og:url" content={canonicalUrl} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />

      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={resolvedTitle} />
      <meta key="twitter:description" name="twitter:description" content={resolvedDescription} />
      <meta key="twitter:image" name="twitter:image" content={fullImageUrl} />
    </Head>
  )
}

export default SEOHead
