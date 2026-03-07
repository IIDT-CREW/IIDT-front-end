import dynamic from 'next/dynamic'
import SEOHead from 'components/SEO/SEOHead'
const Home = dynamic(import('views/Home'))

// import { withAuthComponent, withAuthServerSideProps } from 'hoc/withAuthServerSide'

const IndexPage = () => {
  return (
    <>
      <SEOHead />
      <Home />
    </>
  )
}

export default IndexPage
// export default withAuthComponent(IndexPage, false)
// export const getServerSideProps = withAuthServerSideProps()
