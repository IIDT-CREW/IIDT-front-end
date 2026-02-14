import { Box, Text, Flex } from 'components/Common'
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
    <Box
      className="box"
      mb="40px"
      padding="20px"
      minWidth="362px"
      maxWidth="582px"
      borderRadius="4px"
      style={{ background: 'var(--color-bg)' }}
    >
      <Box data-aos="fade" data-aos-duration="2500">
        {isDisplayHeader && (
          <Box
            height="25px"
            style={{
              boxShadow: '0 -1px 4px rgb(0 0 0 / 70%)',
              background: 'var(--color-contrast)',
            }}
          >
            <Text color="#fff" fontSize="18px" textAlign="center">
              마지막으로...
            </Text>
          </Box>
        )}
        <Box mt="40px">
          <pre className="whitespace-break-spaces font-normal leading-[1.5] text-lg p-5 text-[var(--color-text)]">
            {isDefaultType ? (
              content
            ) : (
              answerList?.map((answer) => {
                return (
                  <>
                    <Text bold>{QUESTION_LIST[parseInt(answer?.question_index)]?.question}</Text>
                    <Text>{answer?.question_answer}</Text>
                  </>
                )
              })
            )}
          </pre>
        </Box>
        <Flex mt="18px" justifyContent="end">
          <Text color="grayscale5">{memNickname ? memNickname : '익명'} 마침.</Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default WillCard
