import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LoaderPage from 'components/LoaderPage'

const withAuth = (Component: any) => {
  return (props: any) => {
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/')
      }
    }, [status, router])

    if (status === 'loading') return <LoaderPage />
    if (status === 'unauthenticated') return <LoaderPage />
    return <Component {...props} />
  }
}

export default withAuth
