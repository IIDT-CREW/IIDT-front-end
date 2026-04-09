import SEOHead from 'components/SEO/SEOHead'
import cn from 'utils/cn'

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  content?: string
  isFullPage?: boolean
}

const Page: React.FC<PageProps> = ({ children, title, content, isFullPage = false, className, ...props }) => {
  return (
    <>
      <SEOHead title={title} description={content} />
      <div className={cn('sm:pt-[50px] sm:pb-6 lg:pt-[50px] lg:pb-8', isFullPage && '!pt-0', className)} {...props}>
        {children}
      </div>
    </>
  )
}

export default Page
