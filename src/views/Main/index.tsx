'use client'

import { useEffect, useContext, useMemo } from 'react'
import { useModal } from 'components/Common'
import BannerCard from './components/BannerCard'
import MainInfo from './components/MainInfo'
import { MainButton } from '../Home'
import WriteWarningInfoModal from './components/modal/WriteWarningInfoModal'
import LoginModal from 'components/LoginModal'
import WillCard from 'components/WillCard'
import { toastContext } from 'contexts/Toast'
import { useIsLogin, useUserInfo } from '@/hooks/useAuth'
import { DEFAULT_PAGE_SIZE } from 'config/constants/default'
import useIntersect from './hooks/useIntersect'
import { useInfiniteMyWill, useDeleteWill } from '@/queries'
import { Skeleton } from 'components/Common/Skeleton'
import { useNavigate } from '@/hooks/useCurrentPath'
import styles from './components/main-shared.module.css'

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

  const willList = useMemo(() => (myWillData ? myWillData.pages.flatMap(({ list }) => list) : []), [myWillData])

  return (
    <>
      {!error &&
        willList?.map((myWill, i) => (
          <div key={`${i}-${myWill.WILL_ID}`}>
            <WillCard will={myWill} handleDelete={() => deleteMutation.mutate({ willId: myWill.WILL_ID as string })} />
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
  const [presentLoginModal] = useModal(<LoginModal />)
  const navigate = useNavigate()
  useEffect(() => {
    const isPrecented = localStorage.getItem('isPrecented')
    if (!isPrecented) {
      localStorage.setItem('isPrecented', 'true')
      presentWarningModal()
    }
    if (isPrecented) return
  }, [presentWarningModal])

  const handleWrite = () => {
    if (!isLogin) {
      presentLoginModal()
      return
    }

    navigate('/write')
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageSectionGap}>
        <BannerCard />
      </div>
      <div className={styles.centerColumn}>
        <div className={styles.centerColumn}>
          <MainInfo />
          <div className={styles.writeButtonWrap}>
            <MainButton onClick={handleWrite}>작성하러가기</MainButton>
          </div>
          {isLogin && <WillContainer />}
        </div>
      </div>
    </div>
  )
}

export default Main
