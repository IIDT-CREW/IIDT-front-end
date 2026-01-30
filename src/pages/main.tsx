import Page from '@components/Layout/Page'
import dynamic from 'next/dynamic'

const Main = dynamic(() => import('views/Main'))

const MainPage = () => {
  return (
    <Page isFullPage>
      <Main />
    </Page>
  )
}

export default MainPage
