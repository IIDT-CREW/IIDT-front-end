import { useEffect, useContext, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useModal } from 'components/Common'
import BannerCard from './components/BannerCard'
import MainInfo from './components/MainInfo'
import { MainButton } from '../Home'
import WriteWarningInfoModal from './components/modal/WriteWarningInfoModal'
import WillCard from 'components/WillCard'
import { toastContext } from 'contexts/Toast'
import { useIsLogin, useUserInfo } from '@/hooks/useAuth'
import { DEFAULT_PAGE_SIZE } from 'config/constants/default'
import useIntersect from './hooks/useIntersect'
import { useInfiniteMyWill, useDeleteWill } from '@/queries'
import { Skeleton } from 'components/Common/Skeleton'

const WillContainer = () => {
  const { memIdx } = useUserInfo()
  const { onToast } = useContext(toastContext)

  const handleToast = ({ message = '' }) => {
    onToast({
      type: 'success',
      message,
      option: {
        position: 'top-center',
      },
    })
  }

  const {
    data: myWillData,
    error,
    status,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteMyWill({
    memIdx: String(memIdx),
    pageSize: parseInt(DEFAULT_PAGE_SIZE, 10),
  })

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  })

  const deleteMutation = useDeleteWill({
    onSuccessCallback: () => {
      handleToast({ message: '데이터를 삭제했습니다.' })
    },
  })

  const willList = useMemo(
    () => (myWillData ? myWillData.pages.flatMap(({ list }) => list) : []),
    [myWillData]
  )

  return (
    <>
      {!error &&
        willList?.map((myWill, i) => (
          <div key={`${i}-${myWill.WILL_ID}`}>
            <WillCard
              will={myWill}
              handleDelete={() => deleteMutation.mutate({ willId: myWill.WILL_ID as string })}
            />
          </div>
        ))}

      {(status === 'pending' || isFetching) && (
        <>
          {Array.from({ length: parseInt(DEFAULT_PAGE_SIZE, 10) }).map((v, index) => {
            return <Skeleton key={`my-will-${index}`} height="480px" minWidth="362px" maxWidth="582px" />
          })}
        </>
      )}

      <div ref={ref} />
    </>
  )
}
const Main = () => {
  const isLogin = useIsLogin()
  const [presentWarningModal] = useModal(<WriteWarningInfoModal />)
  useEffect(() => {
    const isPrecented = localStorage.getItem('isPrecented')
    if (!isPrecented) {
      localStorage.setItem('isPrecented', 'true')
      presentWarningModal()
    }
    if (isPrecented) return
  }, [presentWarningModal])

  const router = useRouter()

  const handleWrite = () => {
    router.push('write')
  }

  return (
    <div className="mt-[78px] min-h-[calc(100%_-_231px)]">
      <div className="mb-9">
        <BannerCard />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <MainInfo />
          <div className="mb-[55px]">
            <MainButton onClick={handleWrite}>작성하러가기</MainButton>
          </div>
          {isLogin && <WillContainer />}
        </div>
      </div>
    </div>
  )
}

export default Main
