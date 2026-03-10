import PageSection from 'components/PageSection'

const LoaderPage = () => {
  return (
    <PageSection innerProps={{ className: 'h-screen w-full' }} index={1}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-grayscale-7 border-t-transparent rounded-full" />
        <p className="mt-[15px] leading-relaxed">잠시만 기다려주세요.</p>
      </div>
    </PageSection>
  )
}
export default LoaderPage
