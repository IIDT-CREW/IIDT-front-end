import React from 'react'
import moment from 'moment'
import { IS_DEFAULT_MODE } from 'config/constants/default'
import { Will } from '@api/will/types'
import { QUESTION_LIST } from '@views/Write/data'

type BodyProps = {
  will?: Will
  handleDelete?: () => void
  handleShare?: () => void
  isPrivate?: boolean
}

const Body = ({ will }: BodyProps) => {
  const { CONTENT: content, REG_DATE: regDate, TITLE: title, CONTENT_TYPE: contentType, ANSWER_LIST: answerList } = will

  const isDefaultType = contentType === IS_DEFAULT_MODE

  return (
    <div>
      <p className="mb-4 text-[23px] font-semibold leading-relaxed">
        {title ? title : `${moment(regDate).format('YYYY년 M월 D일')}에 쓰는 오늘 유서`}
      </p>

      {isDefaultType ? (
        <pre className="whitespace-break-spaces font-normal leading-[1.5] text-lg text-[var(--color-text)]">
          {content}
        </pre>
      ) : (
        <div className="whitespace-break-spaces text-lg leading-[1.5] text-[var(--color-text)]">
          {answerList?.map((answer, index) => {
            return (
              <div key={`answer_${index}`}>
                <p className="font-semibold">
                  {QUESTION_LIST.find((item) => item.qusIdx === parseInt(answer?.question_index))?.question}
                </p>
                <p>{answer?.question_answer}</p>
                <br />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default React.memo(Body)
