import Page from '@components/Layout/Page'
import { Flex, Box } from '@components/Common'
import WillCard from '@views/Will/components/WillShareCard'
import TitleBanner from '@views/Will/components/TitleBanner'
import { ABOUT_INFO } from '@views/About/data'
import { useEffect } from 'react'
import AOS from 'aos'
import { useIsScrollDown, useMenuOff } from '@store/navi/hooks'

const WillTitle = () => {
  return (
    <Box mb="36px">
      <TitleBanner
        height="100vh"
        title={ABOUT_INFO.TITLE}
        date={ABOUT_INFO.REG_DATE}
        imagePath={ABOUT_INFO.THUMBNAIL}
      />
    </Box>
  )
}

const WillContent = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <WillCard will={ABOUT_INFO} isDisplayHeader={false} />
      </Flex>
    </Flex>
  )
}

const AboutPage = () => {
  const handleMenuOff = useMenuOff()
  const { handleSetIsScrollDown } = useIsScrollDown()
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  useEffect(() => {
    handleMenuOff()
    handleSetIsScrollDown(true)
  }, [handleMenuOff, handleSetIsScrollDown])

  return (
    <Page title={ABOUT_INFO.TITLE} content={ABOUT_INFO.CONTENT} isFullPage>
      <div style={{ minHeight: 'calc(100% - 231px)' }}>
        <WillTitle />
        <WillContent />
      </div>
    </Page>
  )
}

export default AboutPage
