import { Card } from 'components/ui/card'
import { Will } from '@api/will/types'
import { QUESTION_LIST } from '@views/Write/data'
import { IS_DEFAULT_MODE } from 'config/constants/default'
import styles from '../will.module.css'

type WillCardProps = {
  will?: Will
  isDisplayHeader?: boolean
}

const WillCard = ({ will, isDisplayHeader = true }: WillCardProps) => {
  if (!will) return null

  const { CONTENT: content, MEM_NICKNAME: memNickname, CONTENT_TYPE: contentType, ANSWER_LIST: answerList } = will

  const isDefaultType = contentType === IS_DEFAULT_MODE

  return (
    <Card className={styles.card} data-aos="fade" data-aos-duration="2500">
      {isDisplayHeader && (
        <div className={styles.cardHeader}>
          <p className={styles.cardHeaderText}>마지막으로...</p>
        </div>
      )}
      <div className={styles.cardBody}>
        {isDefaultType ? (
          <pre className={styles.cardContents}>{content}</pre>
        ) : (
          <div className={styles.cardContents}>
            {answerList?.map((answer, index) => (
              <div key={`share-answer-${index}`}>
                <p className="font-semibold">{QUESTION_LIST[parseInt(answer?.question_index)]?.question}</p>
                <p>{answer?.question_answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.cardAuthorRow}>
        <p className={styles.cardAuthor}>{memNickname ? memNickname : '익명'} 마침.</p>
      </div>
    </Card>
  )
}

export default WillCard
