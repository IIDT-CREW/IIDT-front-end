'use client'

import { useEffect, useCallback } from 'react'
import AOS from 'aos'
import Page from '@components/Layout/Page'
import { useWill } from '@/queries/will'
import WillCard from '@views/Will/components/WillShareCard'
import TitleBanner from '@views/Will/components/TitleBanner'
import { MainButton } from '@views/Home'
import type { Will } from '@api/will/types'
import { useNavigate, useRouteParam } from '@/hooks/useCurrentPath'
import styles from './will.module.css'

type WillTitleProps = {
  data?: Will
}

const WillTitle = ({ data }: WillTitleProps) => {
  return (
    <div className={styles.titleWrap}>
      <TitleBanner
        height="100vh"
        title={data?.TITLE}
        date={data?.REG_DATE}
        imagePath="https://images.unsplash.com/photo-1436891620584-47fd0e565afb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
      />
    </div>
  )
}

type WillContentProps = {
  isLoading: boolean
  data?: Will
}
const WillContent = ({ isLoading, data }: WillContentProps) => {
  return (
    <div className={styles.contentOuter}>
      <div className={styles.contentInner}>{!isLoading && data && <WillCard will={data} />}</div>
    </div>
  )
}
type WillFooterProps = {
  handleWrite: () => void
}
const WillFooter = ({ handleWrite }: WillFooterProps) => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTextWrap}>
          <p className={styles.footerText} data-aos="fade-up" data-aos-duration="1000">
            한번 하루 유서를 적어보시겠어요?
          </p>
          <p className={styles.footerText} data-aos="fade-up" data-aos-duration="1500">
            좋은 경험이 될거에요.
          </p>
        </div>
        <div className={styles.footerButtonWrap} data-aos="fade" data-aos-duration="3000">
          <MainButton onClick={handleWrite}>네. 작성해보겠습니다.</MainButton>
        </div>
      </div>
    </div>
  )
}
const WillPage = () => {
  const navigate = useNavigate()
  const willId = useRouteParam('id')
  const { data, isLoading, isError } = useWill(willId, { enabled: !!willId })

  const handleWrite = useCallback(() => {
    navigate('/write')
  }, [navigate])

  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  if (isError) {
    return <div>error</div>
  }

  return (
    <Page title={data?.TITLE} content={data?.CONTENT} isFullPage>
      <div className={styles.container}>
        <WillTitle data={data} />
        <WillContent data={data} isLoading={isLoading} />
        <WillFooter handleWrite={handleWrite} />
      </div>
    </Page>
  )
}

export default WillPage
