import { useCallback, useState } from 'react'
import { Box, Text, Flex } from 'components/Common'
import moment from 'moment'
import StyledImage from 'components/Common/Image/StyledImage'
import Typing from 'views/Home/components/Typing'
import cn from 'utils/cn'

type TitleBannerProps = {
  height: string
  title: string
  date: string
  imagePath: string
}
const TitleBanner = ({ height, title, date, imagePath }: TitleBannerProps) => {
  const [status, setStatus] = useState<'is_done' | 'is_init'>('is_init')

  const handleStatus = useCallback((status: 'is_done' | 'is_init') => {
    setStatus(status)
  }, [])

  return (
    <Box paddingTop="">
      <Box width="100%" height={height} position="relative">
        <StyledImage
          isFill
          src={imagePath}
          alt={'jms-ZfVqAKZ4YRQ-unsplash'}
          position="fixed"
          className="absolute w-full h-full -z-[1] object-cover bg-[linear-gradient(0deg,rgba(255,255,255,0.2),rgba(255,255,255,0.2))] [clip-path:inset(0)]"
        />
        <Box width="100%" height={height} position="relative">
          <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%" position="relative">
            <div
              className="dark:px-2.5 text-[18px] lg:text-[32px] font-semibold bg-black text-white w-4/5 text-center leading-normal"
            >
              <span className="text-white">
                <Typing str={title} handleStatus={handleStatus} status={status} />
              </span>
            </div>
            <div
              className={cn(
                'dark:px-2.5 text-[14px] lg:text-[18px] font-semibold text-white transition-all duration-1000 leading-normal',
                status === 'is_done'
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-[15px]',
              )}
            >
              {moment(date).format('YYYY년 MM월 DD일 hh시 mm분')}
            </div>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default TitleBanner
