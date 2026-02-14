import { useEffect, useContext, useMemo, useState } from 'react'
import { Box, Flex, Heading } from 'components/Common'
import WillCard from 'components/WillCard'
import { useQueryClient } from '@tanstack/react-query'
import { toastContext } from 'contexts/Toast'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from 'config/constants/default'
import useIntersect from './hooks/useIntersect'
import { useInfiniteWillList, useDeleteWill, queryKeys } from '@/queries'
import { Skeleton } from 'components/Common/Skeleton'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'

const makeDateList = (year: string, nextYear: string) => {
  const dateList = [
    {
      title: '이른 봄',
      fromDate: `${year}-02-04`,
      toDate: `${year}-03-04`,
    },
    {
      title: '봄',
      fromDate: `${year}-03-05`,
      toDate: `${year}-05-04`,
    },
    {
      title: '이른 여름',
      fromDate: `${year}-05-05`,
      toDate: `${year}-06-04`,
    },
    {
      title: '여름',
      fromDate: `${year}-06-05`,
      toDate: `${year}-08-07`,
    },
    {
      title: '이른 가을',
      fromDate: `${year}-08-08`,
      toDate: `${year}-09-08`,
    },
    {
      title: '가을',
      fromDate: `${year}-09-08`,
      toDate: `${year}-11-03`,
    },
    {
      title: '이른 겨울',
      fromDate: `${year}-11-04`,
      toDate: `${year}-12-03`,
    },
    {
      title: '겨울',
      fromDate: `${year}-11-05`,
      toDate: `${nextYear}-02-03`,
    },
  ]
  return dateList
}
const getWillTitle = (will: any) => {
  const targetDate = moment(will?.EDIT_DATE ?? will?.REG_DATE)
  const year = targetDate.format('YYYY')
  const nextYear = moment(will?.EDIT_DATE ?? will?.REG_DATE)
    .add(1, 'y')
    .format('YYYY')
  const dateList = makeDateList(year, nextYear)
  let title = ''
  dateList.forEach((date) => {
    if (moment(targetDate.format('YYYY-MM-DD')).isBetween(date.fromDate, date.toDate)) {
      title = date.title
    }
  })
  return `${year}년 ${title}`
}

const WillContainerHeader = ({ dateTitle }: { dateTitle: string }) => {
  return (
    <Box mt="20px" mb="20px">
      <Heading textAlign={'center'}>어느 {dateTitle}에 남겨진 기억.</Heading>
    </Box>
  )
}
const WillContainer = () => {
  const queryClient = useQueryClient()
  const { onToast } = useContext(toastContext)

  const handleToast = ({ message = '' }) => {
    onToast({
      type: 'success',
      message,
      option: {
        position: 'top-center',
      },
    })
  }

  const {
    data: myWillData,
    error,
    status,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteWillList({
    pageSize: parseInt(DEFAULT_PAGE_SIZE, 10),
  })

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  })

  const deleteMutation = useDeleteWill({
    onSuccessCallback: () => {
      handleToast({ message: '데이터를 삭제했습니다.' })
    },
  })

  const willList = useMemo(
    () => (myWillData ? myWillData.pages.flatMap(({ list }) => list) : []),
    [myWillData]
  )

  const [dateGroupingWillList, setDateGroupingWillList] = useState<Record<string, any[]>>({})
  useEffect(() => {
    if (willList.length === 0) return
    const grouped: Record<string, any[]> = {}
    willList.map((will) => {
      const title = getWillTitle(will)
      grouped[title] = grouped[title] ? grouped[title].concat(will) : (grouped[title] = [will])
    })
    setDateGroupingWillList(grouped)
  }, [willList])

  return (
    <>
      {!error &&
        !isEmpty(dateGroupingWillList) &&
        Object.keys(dateGroupingWillList)?.map((dateTitle, key) => {
          return (
            <Box key={`${dateTitle}_${key}`}>
              <WillContainerHeader dateTitle={dateTitle} />
              {dateGroupingWillList[dateTitle]?.map((will, i) => {
                return (
                  <WillCard
                    key={`${i}-${will.WILL_ID}`}
                    isPrivate={false}
                    will={will}
                    handleDelete={() => deleteMutation.mutate(will.WILL_ID as string)}
                  />
                )
              })}
            </Box>
          )
        })}

      {(status === 'pending' || isFetching) && (
        <>
          {Array.from({ length: parseInt(DEFAULT_PAGE_SIZE, 10) }).map((v, index) => {
            return <Skeleton key={`my-will-${index}`} height="480px" minWidth="362px" maxWidth="582px" />
          })}
        </>
      )}

      <div ref={ref} />
    </>
  )
}

const Memorials = () => {
  return (
    <Box mt="78px" style={{ minHeight: 'calc(100% - 231px)' }}>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <WillContainer />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Memorials
