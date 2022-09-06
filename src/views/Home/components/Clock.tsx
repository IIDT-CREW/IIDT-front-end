import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import { Box, Text, Flex } from 'components/Common'
import styled from 'styled-components'

const Clock = ({ height = '300px', isCountDown = true, text = '' }) => {
  const timer: any = useRef(null)
  const [time, setTime] = useState(moment())

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime(moment())
    }, 1000)
    return () => {
      clearInterval(timer.current)
    }
  }, [])
  // const nextDay = moment(moment().add(1, 'days').format('YYYY-MM-DD'))
  // const leftTime = nextDay.unix() - time.unix()
  //const formatted = moment.utc(leftTime * 1000).format('HH:mm:ss')
  return (
    <Box paddingTop="">
      <Box width="100%" height={height} position="relative">
        <Box width="100%" height={height} position="relative">
          <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%" position="relative">
            <Text fontSize={['18px', null, null, '26px']}>현재 시간</Text>
            <Text fontWeight="700" fontSize={['36px', null, null, '48px']}>
              {time.format('HH:mm:ss')}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default Clock
