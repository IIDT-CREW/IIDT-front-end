import { forwardRef } from 'react'
import NextLink from 'next/link'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: any
  replace?: boolean
  innerRef?: React.Ref<HTMLAnchorElement>
  prefetch?: boolean
}

/**
 * temporary solution for migrating React Router to Next.js Link
 */
export const NextLinkFromReactRouter = forwardRef<any, LinkProps>(
  ({ to, replace, children, prefetch, ...props }, ref) => (
    <NextLink href={to as string} replace={replace} passHref prefetch={prefetch}>
      <a ref={ref} {...props}>
        {children}
      </a>
    </NextLink>
  ),
)

NextLinkFromReactRouter.displayName = 'NextLinkFromReactRouter'
