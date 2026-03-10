import { FOOTER_HEIGHT } from 'config/constants/default'

const Footer = () => {
  return (
    <footer
      className="border-t border-[#D4D4D4] border-b-0 p-5"
      style={{ height: `${FOOTER_HEIGHT}px` }}
    >
      <p className="mr-[10px] text-xs">IIDT</p>
      <div className="flex">
        <a
          href="https://iidtcrew.notion.site/IIDT-CREW-74a141ff2a93486594249a8c84fe9270"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2.5 text-xs cursor-pointer text-inherit no-underline"
        >
          * 팀 소개 | Notion
        </a>
        <p className="mr-[10px] text-xs">* Email | iidtcrew@gmail.com</p>
      </div>
    </footer>
  )
}

export default Footer
