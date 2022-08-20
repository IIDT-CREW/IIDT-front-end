import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.25 17.25L6.75 6.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M17.25 6.75L6.75 17.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  )
}

export default Icon
