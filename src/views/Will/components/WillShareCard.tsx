import { Card } from 'components/ui/card'
import { Will } from '@api/will/types'
import { QUESTION_LIST } from '@views/Write/data'
import { IS_DEFAULT_MODE } from 'config/constants/default'

type WillCardProps = {
  will?: Will
  isDisplayHeader?: boolean
}

const WillCard = ({ will, isDisplayHeader = true }: WillCardProps) => {
  const {
    CONTENT: content,
    MEM_NICKNAME: memNickname,
    CONTENT_TYPE: contentType,
    ANSWER_LIST: answerList,
  } = will

  const isDefaultType = contentType === IS_DEFAULT_MODE

  return (
    <Card className="box mb-10 min-w-[362px] max-w-[582px] rounded-[4px] bg-[var(--color-bg)] px-5 py-5" data-aos="fade" data-aos-duration="2500">
      {isDisplayHeader && (
        <div className="h-[25px] bg-[var(--color-contrast)] shadow-[0_-1px_4px_rgb(0_0_0/70%)]">
          <p className="text-center text-lg text-white">마지막으로...</p>
        </div>
      )}
      <div className="mt-10">
        {isDefaultType ? (
          <pre className="whitespace-break-spaces p-5 text-lg leading-[1.5] text-[var(--color-text)]">
            {content}
          </pre>
        ) : (
          <div className="space-y-4 p-5 text-lg leading-[1.5] text-[var(--color-text)]">
            {answerList?.map((answer, index) => (
              <div key={`share-answer-${index}`}>
                <p className="font-semibold">
                  {QUESTION_LIST[parseInt(answer?.question_index)]?.question}
                </p>
                <p>{answer?.question_answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-[18px] flex justify-end">
        <p className="text-[var(--color-grayscale-5)]">{memNickname ? memNickname : '익명'} 마침.</p>
      </div>
    </Card>
  )
}

export default WillCard
