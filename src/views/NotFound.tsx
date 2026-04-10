import Link from 'next/link'
import styles from './notfound.module.css'

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.inner}>
        <p className={styles.title}>길을 잃으셨나요?</p>
        <p className={styles.text}> 괜찮아요. 저희가 안내할게요.</p>
        <p className={styles.text}> 찾으시는 페이지의 주소가 잘못 입력되었거나,</p>
        <p className={`${styles.text} ${styles.textGap}`}>주소의 변경 혹은 삭제로 인해 사용하실수 없습니다.</p>

        <p className={styles.text}>
          입력하신 페이지의 주소가 정확한지 다시 한 번 획인해주시고, 같은 문제가 또 발생한다면
        </p>
        <p className={`${styles.text} ${styles.textGap}`}>ifteam@gmail.com으로 알려주세요.</p>
        <Link
          href="/"
          className="flex h-[50px] w-[335px] items-center justify-center rounded-[4px] bg-[var(--color-contrast)] px-4 py-[14px] font-[SUIT] text-[13.3333px] text-[var(--color-bg)] no-underline sm:h-[44px]"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  )
}

export default NotFound
