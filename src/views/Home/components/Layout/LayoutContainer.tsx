import { ReactElement } from 'react'

type LayoutContainerProps = {
  leftChildren: ReactElement
  rightChildren: ReactElement
  leftAosArray: string[]
  rightAosArray: string[]
}

const LayoutContainer = ({ leftChildren, rightChildren, leftAosArray, rightAosArray }: LayoutContainerProps) => {
  return (
    <div className="relative mt-[50px] flex flex-col items-center justify-center" id="homepage-hero">
      <div className="relative mb-0 flex h-full w-full flex-1 justify-center">
        <div
          className="flex-1 justify-center text-center"
          data-aos={leftAosArray[0] && leftAosArray[0]}
          data-aos-offset={leftAosArray[1] && leftAosArray[1]}
          data-aos-easing={leftAosArray[2] && leftAosArray[2]}
          data-aos-duration={leftAosArray[3] && leftAosArray[3]}
          data-aos-anchor={leftAosArray[4] && leftAosArray[4]}
          data-aos-placement={leftAosArray[5] && leftAosArray[5]}
        >
          {leftChildren}
        </div>
        <div
          className="flex-1 justify-center text-center"
          data-aos={rightAosArray[0] && rightAosArray[0]}
          data-aos-offset={rightAosArray[1] && rightAosArray[1]}
          data-aos-easing={rightAosArray[2] && rightAosArray[2]}
          data-aos-duration={rightAosArray[3] && rightAosArray[3]}
          data-aos-anchor={rightAosArray[4] && rightAosArray[4]}
          data-aos-placement={rightAosArray[5] && rightAosArray[5]}
        >
          {rightChildren}
        </div>
      </div>
    </div>
  )
}

export default LayoutContainer
