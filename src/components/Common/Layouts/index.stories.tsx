import React from 'react'
import { BaseLayout, CardsLayout } from '.'

export default {
  title: 'Components/Layouts',
  argTypes: {},
}

const Stub = () => (
  <div className="w-full bg-[#1fc7d4] h-[300px]" />
)

export const Base: React.FC = () => {
  return (
    <BaseLayout>
      {[...Array(24)].map((_, i) => (
        <Stub key={i} />
      ))}
    </BaseLayout>
  )
}

export const Cards: React.FC = () => {
  return (
    <CardsLayout>
      {[...Array(10)].map((_, i) => (
        <Stub key={i} />
      ))}
    </CardsLayout>
  )
}
