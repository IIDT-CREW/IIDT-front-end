import { useCallback, useState } from 'react'
import moment from 'moment'
import StyledImage from 'components/Common/Image/StyledImage'
import Typing from 'views/Home/components/Typing'
import cn from 'utils/cn'
import styles from '../will.module.css'

type TitleBannerProps = {
  height: string
  title?: string
  date?: string
  imagePath: string
}
const TitleBanner = ({ height, title, date, imagePath }: TitleBannerProps) => {
  const [status, setStatus] = useState<'is_done' | 'is_init'>('is_init')

  const handleStatus = useCallback((status: 'is_done' | 'is_init') => {
    setStatus(status)
  }, [])

  return (
    <div className={styles.titleBannerWrap}>
      <div style={{ height }}>
        <StyledImage
          isFill
          src={imagePath}
          alt={'jms-ZfVqAKZ4YRQ-unsplash'}
          position="fixed"
          className="absolute w-full h-full -z-[1] object-cover bg-[linear-gradient(0deg,rgba(255,255,255,0.2),rgba(255,255,255,0.2))] [clip-path:inset(0)]"
        />
        <div className={styles.titleBannerInner}>
          <div className={styles.titleBannerContent}>
            <div className={styles.titleText}>
              <span className="text-white">
                <Typing str={title ?? ''} handleStatus={handleStatus} status={status} />
              </span>
            </div>
            <div className={cn(styles.dateText, status === 'is_done' && styles.dateTextVisible)}>
              {date ? moment(date).format('YYYY년 MM월 DD일 hh시 mm분') : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TitleBanner
