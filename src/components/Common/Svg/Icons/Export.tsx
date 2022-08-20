import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5L11.4697 4.46967L12 3.93934L12.5303 4.46967L12 5ZM12.75 14C12.75 14.4142 12.4142 14.75 12 14.75C11.5858 14.75 11.25 14.4142 11.25 14L12.75 14ZM6.46967 9.46967L11.4697 4.46967L12.5303 5.53033L7.53033 10.5303L6.46967 9.46967ZM12.5303 4.46967L17.5303 9.46967L16.4697 10.5303L11.4697 5.53033L12.5303 4.46967ZM12.75 5L12.75 14L11.25 14L11.25 5L12.75 5Z"
        fill="#2E3237"
      />
      <path
        d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
        stroke="#2E3237"
        stroke-width="1.5"
      />
    </Svg>
  )
}

export default Icon