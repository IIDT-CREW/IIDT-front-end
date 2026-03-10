import Page from '@components/Layout/Page'
import WillCard from '@views/Will/components/WillShareCard'
import TitleBanner from '@views/Will/components/TitleBanner'
import { ABOUT_INFO } from '@views/About/data'
import { useEffect } from 'react'
import AOS from 'aos'
import { useIsScrollDown, useMenuOff } from '@store/navi/hooks'

const WillTitle = () => {
  return (
    <div className="mb-9">
      <TitleBanner
        height="100vh"
        title={ABOUT_INFO.TITLE}
        date={ABOUT_INFO.REG_DATE}
        imagePath={ABOUT_INFO.THUMBNAIL}
      />
    </div>
  )
}

const WillContent = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <WillCard will={ABOUT_INFO} isDisplayHeader={false} />
      </div>
    </div>
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
      <div className="min-h-[calc(100%_-_231px)]">
        <WillTitle />
        <WillContent />
      </div>
    </Page>
  )
}

export default AboutPage
