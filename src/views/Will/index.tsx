import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import AOS from 'aos'
import Page from '@components/Layout/Page'
import { Flex, Box, Text, useModal } from '@components/Common'
import { useWill } from '@/queries/will'
import WillCard from '@views/Will/components/WillShareCard'
import TitleBanner from '@views/Will/components/TitleBanner'
import { MainButton } from '@views/Home'
import LoginModal from '@components/LoginModal'
import { useIsLogin } from '@/hooks/useAuth'
import type { Will } from '@api/will/types'

type WillTitleProps = {
  data?: Will
}

const WillTitle = ({ data }: WillTitleProps) => {
  return (
    <Box mb="36px">
      <TitleBanner
        height="100vh"
        title={data?.TITLE}
        date={data?.REG_DATE}
        imagePath="https://images.unsplash.com/photo-1436891620584-47fd0e565afb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
      />
    </Box>
  )
}

type WillContentProps = {
  isLoading: boolean
  data?: Will
}
const WillContent = ({ isLoading, data }: WillContentProps) => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        {!isLoading && data && <WillCard will={data} />}
      </Flex>
    </Flex>
  )
}
type WillFooterProps = {
  handleWrite: () => void
}
const WillFooter = ({ handleWrite }: WillFooterProps) => {
  return (
    <Box mt="50px" mb="50px">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <Text bold data-aos="fade-up" data-aos-duration="1000">
            한번 하루 유서를 적어보시겠어요?
          </Text>
          <Text bold data-aos="fade-up" data-aos-duration="1500">
            좋은 경험이 될거에요.
          </Text>
        </Flex>
        <Box mt="30px" data-aos="fade" data-aos-duration="3000">
          <MainButton onClick={handleWrite}>네. 작성해보겠습니다.</MainButton>
        </Box>
      </Flex>
    </Box>
  )
}
const WillPage = () => {
  const isLogin = useIsLogin()
  const router = useRouter()
  const willId = router.query.id as string
  const { data, isLoading, isError } = useWill(willId, { enabled: !!willId })
  const [presentLoginModal] = useModal(<LoginModal />)

  const handleWrite = useCallback(() => {
    if (!isLogin) presentLoginModal()
    if (isLogin) router.push('/write')
  }, [isLogin, presentLoginModal, router])

  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  if (isError) {
    return <div>error</div>
  }

  return (
    <Page title={data?.TITLE} content={data?.CONTENT} isFullPage>
      <Box style={{ minHeight: 'calc(100% - 231px)' }}>
        <WillTitle data={data} />
        <WillContent data={data} isLoading={isLoading} />
        <WillFooter handleWrite={handleWrite} />
      </Box>
    </Page>
  )
}

export default WillPage
