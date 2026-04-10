import moment, { utc } from 'moment'
import { useEffect, useRef, useState } from 'react'

const CountDown = ({ height = '550px', isCountDown = true, text = '' }) => {
  const [time, setTime] = useState(moment())
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime(moment())
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const nextDay = moment(moment().add(1, 'days').format('YYYY-MM-DD'))
  const leftTime = nextDay.unix() - time.unix()

  return (
    <div>
      <div className="relative w-full" style={{ height }}>
        <img
          src="/images/home/matthew-mendez.jpg"
          alt="road"
          className="absolute w-full h-full -z-[1] object-cover blur-[2px]"
        />
        <div className="relative h-full w-full">
          <div className="relative flex h-full items-center justify-center">
            {text === '' && (
              <p className="text-[72px] leading-none font-bold text-white">
                {isCountDown ? utc(leftTime * 1000).format('HH:mm:ss') : moment().format('HH:mm:ss')}
              </p>
            )}
            {text !== '' && <p className="text-[72px] leading-none font-bold text-white">{text}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountDown
