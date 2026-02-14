import cn from 'utils/cn'

enum Resolution {
  MD = '1.5x',
  LG = '2x',
}
interface ImageAttributes {
  src: string
  alt: string
}

export interface CompositeImageProps {
  path: string
  attributes: ImageAttributes[]
}

interface ComponentProps extends CompositeImageProps {
  animate?: boolean
  maxHeight?: string
}

export const getImageUrl = (base: string, imageSrc: string, resolution?: Resolution, extension = '.png'): string =>
  `${base}${imageSrc}${resolution ? `@${resolution}${extension}` : extension}`

export const getSrcSet = (base: string, imageSrc: string, extension = '.png') => {
  return `${getImageUrl(base, imageSrc, undefined, extension)} 512w,
  ${getImageUrl(base, imageSrc, Resolution.MD, extension)} 768w,
  ${getImageUrl(base, imageSrc, Resolution.LG, extension)} 1024w,`
}

const CompositeImage: React.FC<ComponentProps> = ({ path, attributes, maxHeight = '512px' }) => {
  return (
    <div
      className={cn(
        'relative',
        '[&>:nth-child(2)]:animate-[float1_3s_ease-in-out_infinite_1s]',
        '[&>:nth-child(3)]:animate-[float2_3s_ease-in-out_infinite_0.66s]',
        '[&>:nth-child(4)]:animate-[float3_3s_ease-in-out_infinite_0.33s]',
        '[&>:nth-child(5)]:animate-[float4_3s_ease-in-out_infinite_0s]',
      )}
      style={{ maxHeight }}
    >
      <picture>
        <source type="image/webp" srcSet={getSrcSet(path, attributes[0].src, '.webp')} />
        <source type="image/png" srcSet={getSrcSet(path, attributes[0].src)} />
        <img
          src={getImageUrl(path, attributes[0].src)}
          style={{ maxHeight, visibility: 'hidden' }}
          loading="lazy"
          decoding="async"
        />
      </picture>
      {attributes.map((image) => (
        <div
          key={image.src}
          className="h-full absolute top-0 left-0 [&_img]:max-h-full [&_img]:w-auto"
        >
          <picture>
            <source type="image/webp" srcSet={getSrcSet(path, image.src, '.webp')} />
            <source type="image/png" srcSet={getSrcSet(path, image.src)} />
            <img src={getImageUrl(path, image.src)} alt={image.alt} loading="lazy" decoding="async" />
          </picture>
        </div>
      ))}
    </div>
  )
}

export default CompositeImage
