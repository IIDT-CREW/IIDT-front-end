import { Flex } from 'components/Common'
import { ReactElement } from 'react'

type LayoutContainerProps = {
  leftChildren: ReactElement
  rightChildren: ReactElement
  leftAosArray: string[]
  rightAosArray: string[]
}

const LayoutContainer = ({ leftChildren, rightChildren, leftAosArray, rightAosArray }: LayoutContainerProps) => {
  return (
    <Flex
      position="relative"
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent="center"
      mt={'50px'}
      id="homepage-hero"
    >
      <Flex
        height={'100%'}
        width={'100%'}
        flex={'1'}
        mb={'0'}
        position="relative"
        justifyContent="center"
      >
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
      </Flex>
    </Flex>
  )
}

export default LayoutContainer
