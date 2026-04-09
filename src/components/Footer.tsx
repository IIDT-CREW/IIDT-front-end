import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.title}>IIDT</p>
      <div className={styles.links}>
        <a
          href="https://iidtcrew.notion.site/IIDT-CREW-74a141ff2a93486594249a8c84fe9270"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          * 팀 소개 | Notion
        </a>
        <p className={styles.text}>* Email | iidtcrew@gmail.com</p>
      </div>
    </footer>
  )
}

export default Footer
