import Image from 'next/image'

type ImageWrapperProps = {
  src: any
  alt: string
  width?: string
  height?: string
}
const ImageWrapper = ({ src, alt, width, height }: ImageWrapperProps) => {
  return (
    <div
      className="m-auto text-center will-change-transform [animation:flyingAnim_3.5s_ease-in-out_infinite] [&>span]:!overflow-visible [&_img]:h-full [&_img]:object-cover"
      style={{ width: width || '100%', height: height || '100%' }}
    >
      <Image src={src} priority placeholder="blur" alt={alt} height={height} />
    </div>
  )
}
export default ImageWrapper
