import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="relative flex min-h-[calc(100vh_-_64px)] items-center justify-center">
      <div
        className="absolute -z-[1] min-h-[calc(100vh_-_64px)] w-full"
        style={{
          background:
            'linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(/images/home/joshua-sortino-XMcoTHgNcQA-unsplash.jpg)',
        }}
      />
      <div className="flex flex-col items-center justify-center">
        <p className="mb-[18px] text-[36px] leading-relaxed">길을 잃으셨나요?</p>
        <p className="font-[SUIT] leading-relaxed"> 괜찮아요. 저희가 안내할게요.</p>
        <p className="font-[SUIT] leading-relaxed"> 찾으시는 페이지의 주소가 잘못 입력되었거나,</p>
        <p className="mb-[18px] font-[SUIT] leading-relaxed">주소의 변경 혹은 삭제로 인해 사용하실수 없습니다.</p>

        <p className="font-[SUIT] leading-relaxed">
          입력하신 페이지의 주소가 정확한지 다시 한 번 획인해주시고, 같은 문제가 또 발생한다면
        </p>
        <p className="mb-[18px] font-[SUIT] leading-relaxed">ifteam@gmail.com으로 알려주세요.</p>
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
