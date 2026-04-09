'use client'

import { useMemo } from 'react'
import { useRouter as useCompatRouter } from 'next/compat/router'
import { useParams, usePathname, useSearchParams } from 'next/navigation'

export function useCurrentPath() {
  const compatRouter = useCompatRouter()
  const pathname = usePathname()

  return useMemo(() => {
    if (pathname) return pathname
    if (compatRouter?.asPath) return compatRouter.asPath
    if (compatRouter?.pathname) return compatRouter.pathname
    if (typeof window !== 'undefined') return window.location.pathname
    return '/'
  }, [compatRouter?.asPath, compatRouter?.pathname, pathname])
}

export function useNavigate() {
  const compatRouter = useCompatRouter()

  return (href: string) => {
    if (compatRouter) {
      void compatRouter.push(href)
      return
    }

    if (typeof window !== 'undefined') {
      window.location.href = href
    }
  }
}

export function useReplaceNavigate() {
  const compatRouter = useCompatRouter()

  return (href: string) => {
    if (compatRouter) {
      void compatRouter.replace(href)
      return
    }

    if (typeof window !== 'undefined') {
      window.location.replace(href)
    }
  }
}

export function useCurrentHref() {
  const compatRouter = useCompatRouter()
  const pathname = usePathname()

  return useMemo(() => {
    if (compatRouter?.asPath) return compatRouter.asPath
    if (typeof window !== 'undefined') {
      return `${window.location.pathname}${window.location.search}`
    }
    return pathname || '/'
  }, [compatRouter?.asPath, pathname])
}

export function useRouteQueryParam(key: string) {
  const compatRouter = useCompatRouter()
  const searchParams = useSearchParams()

  return useMemo(() => {
    const appValue = searchParams?.get(key)
    if (appValue) {
      return { value: appValue, isReady: true }
    }

    const compatValue = compatRouter?.query?.[key]
    const value = Array.isArray(compatValue) ? compatValue[0] : compatValue

    return {
      value: value ?? '',
      isReady: compatRouter ? compatRouter.isReady : true,
    }
  }, [compatRouter, key, searchParams])
}

export function useRouteParam(key: string) {
  const compatRouter = useCompatRouter()
  const params = useParams()

  return useMemo(() => {
    const appValue = params?.[key]
    const normalizedAppValue = Array.isArray(appValue) ? appValue[0] : appValue
    if (normalizedAppValue) {
      return normalizedAppValue
    }

    const compatValue = compatRouter?.query?.[key]
    return Array.isArray(compatValue) ? compatValue[0] : compatValue ?? ''
  }, [compatRouter, key, params])
}
