import React from 'react'
import { Modal, ModalProps } from 'components/Common'
import { Button } from 'components/ui/button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import cn from 'utils/cn'

enum EType {
  NAVER,
  KAKAO,
  GOOGLE,
  TEST,
}

const loginStyles: Record<number, string> = {
  [EType.NAVER]: 'bg-[#03c75a] text-white text-[14.5px]',
  [EType.KAKAO]: 'bg-[#fee500] text-[#000000d8] text-[14.5px] rounded',
  [EType.GOOGLE]: 'bg-white border border-[#e2e4e6] rounded text-black text-[14.5px] [&_span]:font-[Roboto,Spoqa_Han_Sans_Neo,sans-serif]',
}

const loginIconStyles: Record<number, string> = {
  [EType.NAVER]: 'bg-[url(/images/login/logo/naver.svg)] brightness-0 invert',
  [EType.KAKAO]: 'bg-[url(/images/login/btn_kakao_icon.svg)]',
  [EType.GOOGLE]: 'bg-[url(/images/login/btn_google_icon.svg)] rounded',
}

interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loginType: EType
}

const LoginButton = ({ loginType, className, ...props }: LoginButtonProps) => (
  <Button
    size="md"
    className={cn(
      'mt-2.5 h-10 w-[310px] justify-center pl-0',
      'focus-visible:ring-[0px] focus-visible:ring-offset-0 focus:shadow-[0px_0px_8px_rgba(0,0,0,0.2)]',
      '[&_span]:w-[264px]',
      loginStyles[loginType],
      className,
    )}
    {...props}
  />
)

const LoginIcon = ({ loginType, className, ...props }: { loginType: EType } & React.HTMLAttributes<HTMLElement>) => (
  <i
    className={cn(
      'w-10 h-10 inline-block bg-no-repeat bg-center',
      loginIconStyles[loginType],
      className,
    )}
    {...props}
  />
)

const LoginModal: React.FC<ModalProps> = ({ onDismiss, ...props }) => {
  const router = useRouter()
  const callbackUrl = router.asPath === '/' ? '/main' : router.asPath

  return (
    <Modal title="로그인이 필요해요" onDismiss={onDismiss} {...props} minWidth="272px">
      <div className="flex flex-col items-center justify-center">
        <LoginButton
          loginType={EType.KAKAO}
          onClick={() => signIn('kakao', { callbackUrl })}
        >
          <LoginIcon loginType={EType.KAKAO} />
          <span>카카오 계정으로 시작하기</span>
        </LoginButton>
        <LoginButton
          loginType={EType.GOOGLE}
          onClick={() => signIn('google', { callbackUrl })}
        >
          <LoginIcon loginType={EType.GOOGLE} />
          <span>Google 계정으로 시작하기</span>
        </LoginButton>

        <div className="mb-8 mt-16">
          <p className="text-[10px] text-[#A4A2A3] underline">개인정보 처리방침</p>
          <p className="text-[10px] text-[#A4A2A3] underline">서비스 이용약관</p>
        </div>
      </div>
    </Modal>
  )
}

export default LoginModal
