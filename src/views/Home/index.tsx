'use client'

import React, { useEffect } from 'react'
import AOS from 'aos'
import Link, { type LinkProps } from 'next/link'
import MainCard from './components/MainCard'
import Clock from './components/Clock'
import styles from './home.module.css'

type MainButtonProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const MainButton = ({ className, ...props }: MainButtonProps) => (
  <Link className={[styles.ctaButton, className].filter(Boolean).join(' ')} {...props} />
)

const Home: React.FC = () => {
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <p className={styles.brand}>IIDT</p>
        <p className={styles.heroTitle}>IF I DIE</p>

        <p className={styles.heroSubtitle}>Tomorrow</p>
        <Clock />

        <MainCard
          height={469}
          title="내일이 내생에"
          secondTitle="마지막이라고 생각해보신적 있나요?"
          imagePath="/images/home/patrick-ryan-3kUIaB2EPp8-unsplash.jpg"
        />
        <div className={styles.spacerLarge} />
        <MainCard
          height={469}
          title=" 만약 내일 생을 마감한다면,"
          secondTitle="소중한 이들에게 하고싶은 말이 있나요?"
          imagePath="/images/home/huyen-pham--PTlx55R-KU-unsplash.jpg"
        />

        <section className={styles.questionSection}>
          <div className={styles.questionSectionInner}>
            <p className={styles.questionText} data-aos="fade-up" data-aos-duration="1000">
              만약 내일 생을 마감한다면,
            </p>
            <p className={styles.questionTextStrong} data-aos="fade-up" data-aos-duration="3000">
              마지막으로 하고 싶은 말이 있나요?
            </p>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <p className={styles.ctaText}>다시 한 번 삶을 되돌아보는 시간</p>
            <MainButton href="/write">일기 작성하러가기</MainButton>
          </div>
        </section>
      </div>

      <div className={styles.bottomSpacer} />
    </>
  )
}

export default Home
