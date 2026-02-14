import React from 'react'
import { Modal, ModalProps, Flex, Box, Text } from 'components/Common'
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
  <button
    className={cn(
      'h-10 w-[310px] mt-2.5 border-none cursor-pointer pl-0 align-middle flex items-center justify-center',
      'focus:shadow-[0px_0px_8px_rgba(0,0,0,0.2)]',
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
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
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

        <Box mt="64px" mb="32px">
          <Text fontSize="10px" color="#A4A2A3" style={{ textDecorationLine: 'underline' }}>
            개인정보 처리방침
          </Text>
          <Text fontSize="10px" color="#A4A2A3" style={{ textDecorationLine: 'underline' }}>
            서비스 이용약관
          </Text>
        </Box>
      </Flex>
    </Modal>
  )
}

export default LoginModal
