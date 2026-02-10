import React, { useState, useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCheckNickname } from '@/queries/auth'
import styled from 'styled-components'
import { Flex, Box, Text } from 'components/Common'
import { Button } from 'components/Common/Button'

const St = {
  Container: styled(Flex)`
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
  `,
  NicknameInput: styled.input`
    outline: none;
    border: 1px solid;
    margin: 2rem 0px;
    resize: none;
    width: 100%;
    max-width: 320px;
    font-size: 18px;
    font-weight: 400;
    font-family: 'Nanum Myeongjo';
    padding: 8px;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 28px;
    background-color: inherit;
    ::placeholder {
      text-align: center;
      color: ${({ theme }) => theme.colors.grayscale5};
    }
  `,
}

export default function OnboardingPage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [shouldCheck, setShouldCheck] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 이미 닉네임이 있으면 메인으로
  useEffect(() => {
    if (session?.user && !session.user.needsNickname) {
      router.replace('/main')
    }
  }, [session, router])

  const { data: checkResult, isLoading } = useCheckNickname(nickname, {
    enabled: shouldCheck && !!nickname,
  })

  useEffect(() => {
    if (!checkResult) return
    setIsDuplicate(checkResult.IS_EXIST)
  }, [checkResult])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    setIsDuplicate(false)
    setIsFetched(false)
    setShouldCheck(false)
  }, [])

  const handleCheck = useCallback(() => {
    setIsFetched(true)
    setShouldCheck(true)
  }, [])

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/auth/complete-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ nickname }),
      })

      const data = await res.json()

      if (data.code === '0000') {
        // 세션 업데이트
        await update({
          memIdx: data.result.memIdx,
          nickname: data.result.nickname,
          needsNickname: false,
        })
        router.replace('/main')
      } else {
        setIsDuplicate(true)
      }
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }, [nickname, isSubmitting, update, router])

  const isValid = nickname.length >= 2
  const showRegisterButton = isValid && !isDuplicate && isFetched && checkResult

  return (
    <St.Container>
      <Text fontSize="24px" mb="8px">
        마지막으로...
      </Text>
      <Text textAlign="center">닉네임을 결정해주세요</Text>
      <St.NicknameInput value={nickname} onChange={handleChange} placeholder="닉네임" maxLength={30} />

      {isDuplicate && isFetched && (
        <Box mb="16px">
          <Text color="red">아쉽지만 다른 닉네임을 사용해주세요.</Text>
        </Box>
      )}

      {showRegisterButton ? (
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          [{nickname}]로 등록할게요!
        </Button>
      ) : (
        <Button onClick={handleCheck} disabled={!isValid || isLoading}>
          {isLoading ? '확인중...' : '결정했습니다.'}
        </Button>
      )}
    </St.Container>
  )
}
