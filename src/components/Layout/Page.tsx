import Head from 'next/head'
import { useRouter } from 'next/router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import cn from 'utils/cn'

export const PageMeta: React.FC<{ title?: string; content?: string }> = ({ title: mainTitle, content }) => {
  const { pathname } = useRouter()

  const pageMeta = getCustomMeta(pathname) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  const pageTitle = title

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta property="og:title" content={mainTitle} />
      <meta property="og:description" content={content ? content : description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  content?: string
  isFullPage?: boolean
}

const Page: React.FC<PageProps> = ({ children, title, content, isFullPage = false, className, ...props }) => {
  return (
    <>
      <PageMeta title={title} content={content} />
      <div
        className={cn(
          'sm:pt-[50px] sm:pb-6 lg:pt-[50px] lg:pb-8',
          isFullPage && '!pt-0',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

export default Page
