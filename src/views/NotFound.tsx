import { Text, Box } from 'components/Common'
import Link from 'next/link'
import { MainButton } from 'views/Home'
import SEOHead from 'components/SEO/SEOHead'

const NotFound = () => {
  return (
    <>
    <SEOHead title="페이지를 찾을 수 없습니다" noindex />
    <Box className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <Box
        className="w-full min-h-[calc(100vh-64px)] absolute -z-[1]"
        style={{
          background:
            'linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(/images/home/joshua-sortino-XMcoTHgNcQA-unsplash.jpg)',
        }}
      ></Box>
      <div className="flex items-center justify-center flex-col">
        <Text fontSize="36px" mb="18px">
          길을 잃으셨나요?
        </Text>
        <Text className="font-[SUIT]"> 괜찮아요. 저희가 안내할게요.</Text>
        <Text className="font-[SUIT]"> 찾으시는 페이지의 주소가 잘못 입력되었거나,</Text>
        <Text className="font-[SUIT]" mb="18px">
          주소의 변경 혹은 삭제로 인해 사용하실수 없습니다.
        </Text>

        <Text className="font-[SUIT]">
          입력하신 페이지의 주소가 정확한지 다시 한 번 획인해주시고, 같은 문제가 또 발생한다면
        </Text>
        <Text className="font-[SUIT]" mb="18px">
          ifteam@gmail.com으로 알려주세요.
        </Text>
        <Link href="/">
          <MainButton className="font-[SUIT]">홈으로 가기</MainButton>
        </Link>
      </div>
    </Box>
    </>
  )
}

export default NotFound
