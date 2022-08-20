import * as React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.75 7.5H20.25" stroke="#2E3237" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" />
      <path d="M3.75 12H20.25" stroke="#2E3237" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" />
      <path d="M3.75 16.5H20.25" stroke="#2E3237" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" />
    </Svg>
  )
}

export default Icon