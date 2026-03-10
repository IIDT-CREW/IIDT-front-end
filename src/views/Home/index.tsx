import Heading from 'components/Common/Heading/Heading'
import React, { useEffect } from 'react'
import AOS from 'aos'
import Link from 'next/link'
import { useIsLogin } from '@/hooks/useAuth'
import { Button } from 'components/ui/button'
import MainCard from './components/MainCard'
import Clock from './components/Clock'
import cn from 'utils/cn'

export const MainButton = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => (
  <Button
    size="md"
    className={cn(
      'w-[335px] sm:h-[44px] font-[SUIT]',
      'bg-[var(--color-contrast)] text-[var(--color-bg)] hover:bg-[var(--color-contrast)]/90',
      className,
    )}
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
      <div className="pt-[50px]">
        <Heading scale="lg" mt="56px" textAlign="center">
          IIDT
        </Heading>
        <p className="mt-4 text-center font-[Cormorant] text-[48px] font-bold leading-none md:text-[96px]">
          IF I DIE
        </p>

        <p className="mb-6 text-center font-[Cormorant] text-[48px] font-bold leading-none md:text-[96px]">
          Tomorrow
        </p>
        <Clock />

        <MainCard
          height={469}
          title="내일이 내생에"
          secondTitle="마지막이라고 생각해보신적 있나요?"
          imagePath="/images/home/patrick-ryan-3kUIaB2EPp8-unsplash.jpg"
          alt="내일이 마지막이라면 - 석양 풍경"
        />
        <div className="mb-[100px]" />
        <MainCard
          height={469}
          title=" 만약 내일 생을 마감한다면,"
          secondTitle="소중한 이들에게 하고싶은 말이 있나요?"
          imagePath="/images/home/huyen-pham--PTlx55R-KU-unsplash.jpg"
          alt="소중한 이들에게 전하는 마지막 메시지"
        />

        <section className="mb-[50px] h-screen text-center">
          <div className="relative flex h-full flex-col items-center justify-center">
            <p className="text-[16px] leading-relaxed md:text-[36px]" data-aos="fade-up" data-aos-duration="1000">
              만약 내일 생을 마감한다면,
            </p>
            <p
              className="mb-6 text-[16px] leading-relaxed font-semibold md:text-[36px]"
              data-aos="fade-up"
              data-aos-duration="3000"
            >
              마지막으로 하고 싶은 말이 있나요?
            </p>
          </div>
        </section>

        <section className="mb-[50px] text-center">
          <div className="flex flex-col items-center justify-center">
            <p className="mb-6 text-[16px] leading-relaxed md:text-[36px] lg:text-[48px]">
              다시 한 번 삶을 되돌아보는 시간
            </p>
            <MainButton asChild>
              <Link href={isLogin ? '/write' : '/main'}>일기 작성하러가기</Link>
            </MainButton>
          </div>
        </section>
      </div>

      <div className="mb-[50px]"></div>
    </>
  )
}

export default Home
