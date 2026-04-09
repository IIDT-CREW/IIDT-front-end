import { useCurrentPath } from './useCurrentPath'

const useFooterDisable = () => {
  const pathname = useCurrentPath()
  const isWritePage = pathname.indexOf('/write') !== -1
  return isWritePage
}

export default useFooterDisable
