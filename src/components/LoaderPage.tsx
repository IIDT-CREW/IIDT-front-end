import { Text, Flex } from 'components/Common'
import PageSection from 'components/PageSection'

const LoaderPage = () => {
  return (
    <PageSection innerProps={{ className: 'h-screen w-full' }} index={1}>
      <Flex
        justifyContent="center"
        alignItems="center"
        className="h-full w-full"
        flexDirection="column"
      >
        <div className="animate-spin w-8 h-8 border-4 border-grayscale-7 border-t-transparent rounded-full" />
        <Text mt={'15px'}>잠시만 기다려주세요.</Text>
      </Flex>
    </PageSection>
  )
}
export default LoaderPage
