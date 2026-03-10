import StyledImage from 'components/Common/Image/StyledImage'

const Card = ({
  height,
  title,
  secondTitle,
  imagePath = '/images/home/huyen-pham--PTlx55R-KU-unsplash.jpg',
  alt = '',
}) => {
  return (
    <div
      className="relative mb-5 w-full"
      style={{
        height: `${height}px`,
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))',
      }}
    >
      <StyledImage
        isFill
        src={imagePath}
        alt={alt}
        className="absolute w-full h-full -z-[1] object-cover blur-[2px]"
      />

      <div className="relative h-full w-full">
        <div className="relative flex h-full flex-col items-center justify-center">
          <p className="text-base leading-relaxed font-semibold text-black md:text-[36px]" data-aos="fade-down" data-aos-duration="1000">
            {title}
          </p>
          <p className="text-base leading-relaxed font-semibold text-black md:text-[36px]" data-aos="fade-up" data-aos-duration="3000">
            {secondTitle}
          </p>
        </div>
      </div>
    </div>
  )
}
export default Card
