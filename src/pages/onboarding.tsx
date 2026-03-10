import React, { useState, useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCheckNickname } from '@/queries/auth'
import { Button } from 'components/ui/button'
import SEOHead from 'components/SEO/SEOHead'

export default function OnboardingPage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [shouldCheck, setShouldCheck] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    <>
      <SEOHead noindex />
      <div className="flex min-h-screen flex-col items-center justify-center p-5">
        <p className="mb-2 text-[24px] leading-relaxed">마지막으로...</p>
        <label htmlFor="nickname-input" className="sr-only">닉네임</label>
        <p className="text-center leading-relaxed">닉네임을 결정해주세요</p>
        <input
          id="nickname-input"
          className="outline-none border border-current my-8 resize-none w-full max-w-[320px] text-lg font-normal font-[Nanum_Myeongjo] p-2 text-[var(--color-text-secondary)] leading-7 bg-inherit placeholder:text-center placeholder:text-grayscale-5"
          value={nickname}
          onChange={handleChange}
          placeholder="닉네임"
          maxLength={30}
        />

        {isDuplicate && isFetched && (
          <div className="mb-4">
            <p className="text-red-500" role="alert">아쉽지만 다른 닉네임을 사용해주세요.</p>
          </div>
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
      </div>
    </>
  )
}
