import styles from './home-card.module.css'

const Card = ({
  height,
  title,
  secondTitle,
  imagePath = '/images/home/huyen-pham--PTlx55R-KU-unsplash.jpg',
  alt = '',
}) => {
  return (
    <div
      className={styles.card}
      style={{
        height: `${height}px`,
      }}
    >
      <div
        aria-hidden="true"
        className={styles.cardBackground}
        style={{
          backgroundImage: `url(${imagePath})`,
        }}
      />

      <div className={styles.cardInner} style={{ height: `${height}px` }}>
        <div className={styles.cardContent}>
          <p className={styles.cardText} data-aos="fade-down" data-aos-duration="1000">
            {title}
          </p>
          <p className={styles.cardText} data-aos="fade-up" data-aos-duration="3000">
            {secondTitle}
          </p>
        </div>
      </div>
    </div>
  )
}
export default Card
