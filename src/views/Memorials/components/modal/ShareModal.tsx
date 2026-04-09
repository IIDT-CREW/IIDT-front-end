import { useEffect } from 'react'
import { Modal } from 'components/Common'
import CopyToClipboard from 'views/Will/components/CopyToClipboard'
import { API_URL } from 'config/constants/api'

const ShareModal = ({ onDismiss, content, willId, title, ...props }: any) => {
  function kakaoShareFix() {
    // Kakao.Link.cleanup()
    Kakao.cleanup()
    if (process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT) {
      // 새로운 키를 이용하여 init
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT)
    }
  }
  useEffect(() => {
    // init 체크
    if (!Kakao.isInitialized()) {
      kakaoShareFix()
    }
  }, [content, willId])

  const handleKakao = () => {
    const kakaoShareFunc = () => {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '오늘 유서',
          description: `${title}\n${content}`,
          imageUrl: 'https://www.if-i-die-tomorrow.com/images/home/patrick-ryan-3kUIaB2EPp8-unsplash.jpg',
          imageWidth: 1200,
          imageHeight: 630,
          link: {
            webUrl: `${API_URL}/will/${willId}`,
            mobileWebUrl: `${API_URL}/will/${willId}`,
          },
        },
        buttons: [
          {
            title: '읽으러 가기',
            link: {
              webUrl: `${API_URL}/will/${willId}`,
              mobileWebUrl: `${API_URL}/will/${willId}`,
            },
          },
        ],
      })
    }
    kakaoShareFunc()
    onDismiss()
  }

  return (
    <Modal title="오늘 유서를 공유하세요" onDismiss={onDismiss} {...props} minWidth="272px">
      <div className="flex flex-col items-center justify-center text-center">
        <p className="leading-relaxed">마음을 담아서 작성하셨나요?</p>
        <p className="leading-relaxed">남들에게도 자신의 오늘 유서를 공유해보세요</p>
        <p className="mb-5 leading-relaxed">마음이 힘들다면 1577-0199로 전화해주세요.</p>
        <p className="mb-5 leading-relaxed">당신은 그 누구보다 소중합니다.</p>
        <div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <CopyToClipboard toCopy={`${API_URL}/will/${willId}`} />
            <div onClick={handleKakao}>
              <img
                alt="카카오톡으로 공유하기"
                src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal
