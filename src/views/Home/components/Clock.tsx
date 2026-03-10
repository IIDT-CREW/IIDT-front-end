import useClock from 'hooks/useClock'

const Clock = ({ height = '300px' }) => {
  const { time } = useClock()
  // const nextDay = moment(moment().add(1, 'days').format('YYYY-MM-DD'))
  // const leftTime = nextDay.unix() - time.unix()
  //const formatted = moment.utc(leftTime * 1000).format('HH:mm:ss')

  return (
    <div>
      <div className="relative w-full" style={{ height }}>
        <div className="relative h-full w-full">
          <div className="relative flex h-full flex-col items-center justify-center">
            <p className="text-lg leading-relaxed lg:text-[26px]">현재 시간</p>
            <p className="text-[36px] leading-relaxed font-bold lg:text-[48px]">{time}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clock
