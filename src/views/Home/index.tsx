import Heading from 'components/Common/Heading/Heading'
import { Box, Flex } from 'components/Common/Box'
import { Text } from 'components/Common/Text'
import React, { useEffect } from 'react'
import AOS from 'aos'
import Link from 'next/link'
import { useIsLogin } from '@/hooks/useAuth'
import MainCard from './components/MainCard'
import Clock from './components/Clock'
import cn from 'utils/cn'

export const MainButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      'flex flex-row justify-center items-center px-4 py-3.5 gap-2.5',
      'w-[335px] h-[50px] sm:h-[44px]',
      'rounded border-none cursor-pointer font-[SUIT]',
      'flex-none order-0 grow',
      className,
    )}
    style={{
      background: 'var(--color-contrast)',
      color: 'var(--color-bg)',
    }}
    {...props}
  />
)

const Home: React.FC = () => {
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])
  const isLogin = useIsLogin()

  return (
    <>
      <Box pt="50px">
        <Heading scale="lg" mt="56px" textAlign="center">
          IIDT
        </Heading>
        <Text
          mt="16px"
          fontFamily="Cormorant"
          fontWeight="700"
          className="text-[48px] md:text-[96px]"
          textAlign="center"
        >
          IF I DIE
        </Text>

        <Text
          fontFamily="Cormorant"
          fontWeight="700"
          className="text-[48px] md:text-[96px]"
          mb="24px"
          textAlign="center"
        >
          Tomorrow
        </Text>
        <Clock />

        <MainCard
          height={469}
          title="내일이 내생에"
          secondTitle="마지막이라고 생각해보신적 있나요?"
          imagePath="/images/home/patrick-ryan-3kUIaB2EPp8-unsplash.jpg"
          alt=""
        />
        <Box mb={'100px'} />
        <MainCard
          height={469}
          title=" 만약 내일 생을 마감한다면,"
          secondTitle="소중한 이들에게 하고싶은 말이 있나요?"
          imagePath="/images/home/huyen-pham--PTlx55R-KU-unsplash.jpg"
          alt=""
        />

        <Box mb="50px" style={{ textAlign: 'center' }} height="100vh">
          <Flex justifyContent="center" alignItems="center" height="100%" position="relative" flexDirection="column">
            <Text className="text-[16px] md:text-[36px]" data-aos="fade-up" data-aos-duration="1000">
              만약 내일 생을 마감한다면,
            </Text>
            <Text
              bold
              className="text-[16px] md:text-[36px]"
              mb="24px"
              data-aos="fade-up"
              data-aos-duration="3000"
            >
              마지막으로 하고 싶은 말이 있나요?
            </Text>
          </Flex>
        </Box>

        <Box mb="50px" style={{ textAlign: 'center' }}>
          <Flex justifyContent="center" flexDirection="column" alignItems="center">
            <Text className="text-[16px] md:text-[36px] lg:text-[48px]" mb="24px">
              다시 한 번 삶을 되돌아보는 시간
            </Text>
            <Link href={isLogin ? '/write' : '/main'}>
              <MainButton>일기 작성하러가기</MainButton>
            </Link>
          </Flex>
        </Box>
      </Box>

      <div style={{ marginBottom: '50px' }}></div>
    </>
  )
}

export default Home
