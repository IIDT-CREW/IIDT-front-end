import useClock from 'hooks/useClock'
import styles from './home-card.module.css'

const Clock = ({ height = '300px' }) => {
  const { time } = useClock()
  // const nextDay = moment(moment().add(1, 'days').format('YYYY-MM-DD'))
  // const leftTime = nextDay.unix() - time.unix()
  //const formatted = moment.utc(leftTime * 1000).format('HH:mm:ss')

  return (
    <div className={styles.clockWrapper}>
      <div style={{ height }}>
        <div className={styles.clockInner} style={{ height }}>
          <div className={styles.clockContent}>
            <p className={styles.clockLabel}>현재 시간</p>
            <p className={styles.clockTime}>{time}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clock
