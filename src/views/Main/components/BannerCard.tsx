import { useState, useEffect } from 'react'
import useClock from 'hooks/useClock'
import useProgressiveImage from 'hooks/useProgressiveImage'
import { Skeleton } from 'components/Common/Skeleton'

const bannerJson = [
  {
    firstLine: '',
    secondLine: '',
    author: '',
    imagePath: '',
  },
  {
    firstLine: '포기하지 말라, 희망을 잃지 말라',
    secondLine: '자신을 저버리지 말라',
    author: '/Christopher Reeve',
    alt: 'Christopher Reeve',
    imagePath: '/images/home/avis-yang-0QPGGcOLxWQ-unsplash.jpg',
  },
  {
    firstLine: '당신은 움츠리기보다 활짝',
    secondLine: '피어나도록 만들어진 존재입니다.',
    author: '/Oprah Winfrey',
    alt: 'Oprah Winfrey',
    imagePath: '/images/home/wes-hicks-u-jh6blYQmQ-unsplash.jpg',
  },
  {
    firstLine: '절대 어제를 후회하지 마라. ',
    secondLine: '인생은 오늘의 나 안에 있고 내일은 스스로 만드는 것이다.',
    author: '/L. Ron Hubbard',
    alt: 'L. Ron Hubbard',
    imagePath: '/images/home/neora-aylon-iI3fVBUUXEE-unsplash.jpg',
  },

  {
    firstLine: '행복이란 하늘이 파랗다는 것을',
    secondLine: '발견하는 것 만큼이나 쉬운 일이다.',
    author: '/Jostein Gaarder',
    alt: 'Jostein Gaarder',
    imagePath: '/images/home/billy-huynh-v9bnfMCyKbg-unsplash.jpg',
  },
  {
    firstLine: '누구나 마음 속에 생각의 보석을 지니고 있다.',
    secondLine: '다만, 캐내지 않아 잠들어 있을 뿐이다.',
    author: '/이어령',
    alt: '이어령',
    imagePath: '/images/home/ant-rozetsky-q-DJ9XhKkhA-unsplash.jpg',
  },
]
// const bannerIndex = Math.floor(Math.random() * 5)
const BannerCard = ({ height = '231px' }) => {
  const { time } = useClock()

  const [bannerIndex, setBannerIndex] = useState(0)
  useEffect(() => {
    setBannerIndex(Math.floor(Math.random() * 5) + 1)
  }, [])

  const { firstLine, secondLine, author, imagePath } = bannerJson[bannerIndex]
  const loaded = useProgressiveImage(imagePath)
  return (
    <div>
      <div className="relative w-full" style={{ height }}>
        <div className="relative h-full w-full bg-center bg-cover" style={{ backgroundImage: loaded ? `url(${loaded})` : undefined }}>
          {!loaded && <Skeleton animation={'pulse'} width="100%" height="100%" />}
          <div
            className="relative flex h-full flex-col items-center justify-center bg-clip-text text-center text-transparent [filter:invert(1)_grayscale(1)_contrast(7)_drop-shadow(2px_2px_2px_black)]"
            style={{ background: 'inherit' }}
          >
            <p className="dark:px-2.5 text-[14px] leading-relaxed font-semibold lg:text-[18px]">
              {firstLine}
            </p>
            <p className="dark:px-2.5 text-[14px] leading-relaxed font-semibold lg:text-[18px]">
              {secondLine}
            </p>
            <p className="dark:px-2.5 text-[14px] leading-relaxed font-semibold lg:text-[18px]">
              {author}
            </p>

            <div className="text-[48px] leading-none font-semibold">{time}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerCard
