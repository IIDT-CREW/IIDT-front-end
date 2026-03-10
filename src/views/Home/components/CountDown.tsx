import moment from 'moment'
import { useState, useEffect } from 'react'

const CountDown = ({ height = '550px', isCountDown = true, text = '' }) => {
  let timer: any = null
  const [time, setTime] = useState(moment())
  useEffect(() => {
    timer = setInterval(() => {
      setTime(moment())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const nextDay = moment(moment().add(1, 'days').format('YYYY-MM-DD'))
  const leftTime = nextDay.unix() - time.unix()
  //const formatted = moment.utc(leftTime * 1000).format('HH:mm:ss')
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
                {isCountDown ? moment.utc(leftTime * 1000).format('HH:mm:ss') : moment().format('HH:mm:ss')}
              </p>
            )}
            {text !== '' && (
              <p className="text-[72px] leading-none font-bold text-white">{text}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountDown
