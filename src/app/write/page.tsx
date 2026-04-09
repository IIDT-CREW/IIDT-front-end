import { Suspense } from 'react'
import Write from '@/views/Write'

const WritePage = () => {
  return (
    <Suspense fallback={null}>
      <Write />
    </Suspense>
  )
}

export default WritePage
