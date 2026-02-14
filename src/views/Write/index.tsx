/* eslint-disable no-sparse-arrays */
import { TextareaHTMLAttributes, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useModal } from 'components/Common'
import SelectPostTypeModal from 'views/Write/components/modal/SelectPostTypeModal'
import { FOOTER_HEIGHT, IS_DEFAULT_MODE, MENU_HEIGHT } from 'config/constants/default'
import { useUserInfo } from '@/hooks/useAuth'
import { nanoid } from 'nanoid'
import ProgressBar from 'components/Common/ProgressBar'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import MenuBar, { StyleMenuButton } from 'views/Write/components/MenuBar'
import { QUESTION_LIST } from 'views/Write/data'
import { useWill, useCreateWill, useUpdateWill } from '@/queries'
import useWarningHistoryBack from './hooks/useWarningHistoryBack'
import cn from 'utils/cn'

const DEFAULT_TITLE = `${new Date().toLocaleDateString('ko-KR', {
  year: '2-digit',
  month: 'long',
  day: 'numeric',
})}에 쓰는 오늘 유서`

const Write = () => {
  const router = useRouter()
  const { memIdx } = useUserInfo()
  const { isMobile } = useMatchBreakpoints()
  const goToBack = useCallback(() => {
    router.push('/main')
  }, [router])
  const { mutate: addPostMutate } = useCreateWill({ onSuccessCallback: goToBack })
  const { mutate: updatePostMutate } = useUpdateWill({ onSuccessCallback: goToBack })
  const isEditMode = !!router?.query?.will_id
  const willId = router?.query?.will_id as string
  const [isDefaultPostType, setIsDefaultPostType] = useState(true)
  const [page, setPage] = useState(0)
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState(
    QUESTION_LIST.map((question) => ({
      questionEssayIndex: '',
      questionIndex: question.qusIdx,
      answer: '',
    })),
  )
  const [isDisableSave, setIsDisableSave] = useState(true)

  const { data, isSuccess: isPostLoaded } = useWill(willId, {
    enabled: router.isReady && isEditMode,
  })

  useWarningHistoryBack({ title, contents, goToBack, page })

  const [isPrivate, setPrivate] = useState(false)
  const handleSetIsPrivate = useCallback(() => {
    setPrivate((prev) => !prev)
  }, [])

  useEffect(() => {
    setIsDisableSave(contents[page].answer.length ? false : true)
  }, [contents, page])

  const setPostWhenEditMode = useCallback(() => {
    if (!data) return

    const {
      TITLE: title,
      CONTENT: content,
      CONTENT_TYPE: contentType,
      ANSWER_LIST: answerList,
      IS_PRIVATE: isPrivate,
    } = data

    setTitle(title)
    setPrivate(!!isPrivate)
    if (contentType === IS_DEFAULT_MODE) {
      const answer = [{ questionIndex: 1, answer: content }, ...contents.slice(1)]
      return setContents(answer)
    }
    /* 질문 타입  */
    setIsDefaultPostType(false)
    const answer = answerList?.map((answer) => {
      return {
        questionEssayIndex: answer.question_essay_index,
        questionIndex: answer.question_index,
        answer: answer.question_answer,
      }
    })
    if (answer) setContents(answer)
  }, [contents, data])

  /* 모달 onOpen */
  useEffect(
    function initialScreenByEditMode() {
      if (router.isReady) {
        if (isEditMode && isPostLoaded) setPostWhenEditMode()
        if (!isEditMode) modal()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, isPostLoaded, isEditMode],
  )

  const handlePostType = useCallback(() => {
    setIsDefaultPostType(false)
  }, [])
  const [modal, onDismiss] = useModal(<SelectPostTypeModal handlePostType={handlePostType} />, false)

  const handleContents = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContents(contents.map((content, i) => (i === page ? { ...content, answer: e.target.value } : content)))
    },
    [contents, page],
  )

  const handleTitle = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value)
  }, [])

  const handlePage = useCallback((page: number) => {
    setPage(page)
  }, [])

  const handleUpsert = useCallback(() => {
    const parameter = {
      title: title.length ? title : DEFAULT_TITLE,
      thumbnail: 'title',
      mem_idx: memIdx,
      content: isDefaultPostType ? contents[0].answer : '',
      will_id: isEditMode ? willId : nanoid(),
      is_private: isPrivate,
      content_type: isDefaultPostType ? 0 : 1,
      answer_list: isDefaultPostType
        ? null
        : contents?.map((content) => ({
            qs_essay_idx: content.questionEssayIndex,
            qs_idx: content.questionIndex.toString(),
            qs_essay_answer: content.answer,
          })),
    }
    isEditMode ? updatePostMutate(parameter) : addPostMutate(parameter)
  }, [addPostMutate, contents, isDefaultPostType, isEditMode, isPrivate, memIdx, title, updatePostMutate, willId])

  return (
    <article
      style={{
        marginTop: `${MENU_HEIGHT}px`,
        position: 'relative',
        height: `calc(100vh - ${MENU_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
      }}
    >
      <MenuBar
        isMobile={isMobile}
        handleUpsert={handleUpsert}
        handlePage={handlePage}
        page={page}
        isDisabled={isDisableSave}
        isLastPage={page === QUESTION_LIST.length - 1}
        isDefaultPostType={isDefaultPostType}
        isPrivate={isPrivate}
        handleSetIsPrivate={handleSetIsPrivate}
      />

      <section className="px-6 h-full flex flex-col">
        <textarea
          value={title}
          onChange={handleTitle}
          rows={1}
          wrap="off"
          placeholder={DEFAULT_TITLE}
          maxLength={30}
          className={cn(
            'outline-none border-none resize-none w-full font-normal leading-7 bg-inherit',
            'font-[Nanum_Myeongjo] text-[var(--color-text-secondary)]',
            'placeholder:text-[var(--color-grayscale-5)]',
            'sm:text-[16px] md:text-[26px]',
          )}
          style={{ height: '30px', marginBottom: '24px', overflow: 'hidden' }}
        />

        {isDefaultPostType || (
          <div
            className="font-[Nanum_Myeongjo] font-bold text-[26px] mb-4 sm:text-[16px] md:text-[26px]"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {QUESTION_LIST[page]?.question}
          </div>
        )}
        <textarea
          placeholder="내용을 입력하세요"
          value={contents[page]?.answer}
          onChange={handleContents}
          maxLength={1500}
          className={cn(
            'outline-none border-none resize-none w-full font-normal leading-7 bg-inherit flex-auto',
            'font-[Nanum_Myeongjo] text-[var(--color-text-secondary)]',
            'placeholder:text-[var(--color-grayscale-5)]',
            'sm:text-[16px] md:text-[18px]',
          )}
        />
        {isDefaultPostType && isMobile && (
          <StyleMenuButton
            isFull={true}
            variant="primary"
            onClick={handleUpsert}
            disabled={false}
            style={{ marginBottom: '16px' }}
          >
            작성 완료
          </StyleMenuButton>
        )}
        {!isDefaultPostType && isMobile && page === QUESTION_LIST.length - 1 && (
          <StyleMenuButton
            isFull={true}
            variant="primary"
            onClick={handleUpsert}
            disabled={isDisableSave}
            style={{ marginBottom: '16px' }}
          >
            모두 다 작성했어요
          </StyleMenuButton>
        )}
      </section>
      {!isDefaultPostType || <ProgressBar value={page + 1} max={QUESTION_LIST.length} wrapperClassName="mb-2.5" />}
    </article>
  )
}

export default Write
