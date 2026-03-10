import { useWillCount } from '@/queries'
import { SkeletonV2 } from 'components/Common/Skeleton'

const MainInfo = () => {
  const { isLoading, isError, data } = useWillCount()

  return (
    <>
      <p className="mb-6 text-lg leading-relaxed font-semibold">지금까지 작성된 오늘 유서</p>
      {isLoading || isError ? (
        <SkeletonV2 height="24px" width="24px" mb="24px"></SkeletonV2>
      ) : (
        <p className="mb-6 text-[26px] leading-relaxed font-semibold">{data}개</p>
      )}

      <p className="mb-6 text-lg leading-relaxed font-semibold">당신의 오늘 유서를 작성해주세요.</p>
    </>
  )
}
export default MainInfo
