'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useCheckNickname } from '@/queries/auth'
import { Button } from 'components/ui/button'
import { useReplaceNavigate } from '@/hooks/useCurrentPath'
import styles from './onboarding.module.css'

export default function OnboardingPage() {
  const { data: session, update } = useSession()
  const replaceNavigate = useReplaceNavigate()
  const [nickname, setNickname] = useState('')
  const [shouldCheck, setShouldCheck] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (session?.user && !session.user.needsNickname) {
      replaceNavigate('/main')
    }
  }, [replaceNavigate, session])

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
        replaceNavigate('/main')
      } else {
        setIsDuplicate(true)
      }
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }, [isSubmitting, nickname, replaceNavigate, update])

  const isValid = nickname.length >= 2
  const showRegisterButton = isValid && !isDuplicate && isFetched && checkResult

  return (
    <div className={styles.container}>
      <p className={styles.title}>마지막으로...</p>
      <label htmlFor="nickname-input" className="sr-only">
        닉네임
      </label>
      <p className={styles.subtitle}>닉네임을 결정해주세요</p>
      <input
        id="nickname-input"
        className={styles.input}
        value={nickname}
        onChange={handleChange}
        placeholder="닉네임"
        maxLength={30}
      />

      {isDuplicate && isFetched && (
        <div className={styles.errorWrap}>
          <p className={styles.errorText} role="alert">
            아쉽지만 다른 닉네임을 사용해주세요.
          </p>
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
  )
}
