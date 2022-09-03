import styled, { keyframes } from 'styled-components'
import useTheme from 'hooks/useTheme'
import Heading from 'components/Common/Heading/Heading'
import { Box, Flex } from 'components/Common/Box'
import { Text } from 'components/Common/Text'
import React, { useEffect } from 'react'
import MainCard from './components/MainCard'
import AOS from 'aos'
import Clock from './components/Clock'
import Link from 'next/link'

//aos
//offest
//easing
//duration
//anchor
//placement

export const MainButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 16px;
  gap: 10px;

  width: 335px;
  height: 50px;

  /* Color/Grayscale 7 */

  background: #000000;
  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 1;

  color: #fff;
  cursor: pointer;

  font-family: SUIT;
`

const Home: React.FC = () => {
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  const { theme } = useTheme()
  // const { accessToken } = useSelector<AppState, AppState['auth']>((state) => state.auth)

  return (
    <>
      <Box pt="50px">
        <Heading scale="lg" mt="56px" textAlign="center">
          IIDT
        </Heading>
        <Text mt="16px" bold fontSize={['60px', '72px', '96px', '96px']} textAlign="center">
          IF I DIE
        </Text>
        <Text bold fontSize={['60px', '72px', '96px', '96px']} mb="24px" textAlign="center">
          Tommorow
        </Text>
        <Clock />

        <MainCard
          height="469px"
          title="내일이 내생에"
          secondTitle="마지막이라고 생각해보신적 있나요?"
          imagePath="/images/home/patrick-ryan-3kUIaB2EPp8-unsplash.jpg"
          alt=""
        />

        <MainCard
          height="469px"
          title=" 만약 내일 생을 마감한다면,"
          secondTitle="소중한 이들에게 하고싶은 말이 있나요?"
          imagePath="/images/home/huyen-pham--PTlx55R-KU-unsplash.jpg"
          alt=""
        />

        <Box mb="50px" style={{ textAlign: 'center' }} height="500px">
          <Flex justifyContent="center" alignItems="center" height="100%" position="relative" flexDirection="column">
            <Text fontSize={['18px', '24px', '36px', '36px']} color="" data-aos="fade-up" data-aos-duration="1000">
              만약 내일 생을 마감한다면,
            </Text>
            <Text
              bold
              fontSize={['18px', '24px', '36px', '36px']}
              color=""
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
            <Text fontSize={['20px', '24px', '36px', '48px']} mb="24px">
              다시 한 번 삶을 되돌아보는 시간
            </Text>
            <Link href="/main">
              <MainButton>작성하러가기</MainButton>
            </Link>
          </Flex>
        </Box>
      </Box>

      <div style={{ marginBottom: '50px' }}></div>
    </>
  )
}

export default Home
