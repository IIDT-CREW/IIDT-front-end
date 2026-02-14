import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Box from '../Box/Box'
import Heading from '../Heading/Heading'
import UIKitCardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import Card from './Card'
import Image from '../Image/NextImage'

const Row = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="mb-8" {...props}>
    {children}
  </div>
)

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {},
} as Meta

export const Default: React.FC = () => {
  return (
    <div style={{ padding: '32px', width: '500px' }}>
      <Row>
        <Card>
          <CardBody>바디</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card isActive>
          <CardBody>Active</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card isSuccess>
          <CardBody>Success</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card isWarning>
          <CardBody>Warning</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card isDisabled>
          <CardBody>Disabled</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
    </div>
  )
}

export const CardHeader: React.FC = () => {
  const headerHeight = '60px'
  const customHeadingColor = '#7645D9'
  const gradientStopPoint = `calc(${headerHeight} + 1px)`
  const borderBackground = `linear-gradient(${customHeadingColor} ${gradientStopPoint}, var(--color-card-border) ${gradientStopPoint})`
  const gradientBorderColor = `linear-gradient(transparent ${gradientStopPoint}, var(--color-card-border) ${gradientStopPoint}), linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)`

  return (
    <div style={{ padding: '32px', width: '500px' }}>
      <Row>
        <Card borderBackground={borderBackground}>
          <Box background={customHeadingColor} p="16px" height={headerHeight}>
            <Heading scale="xl" color="white">
              Custom overlapping Header
            </Heading>
          </Box>
          <CardBody>The border on sides of header is covered</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card borderBackground={gradientBorderColor}>
          <Box background="linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)" p="16px" height={headerHeight}>
            <Heading scale="xl">Gradient overlapping Header</Heading>
          </Box>
          <CardBody>The border on sides of header is covered</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card>
          <UIKitCardHeader>
            <Heading scale="xl">Card Header</Heading>
          </UIKitCardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card>
          <UIKitCardHeader variant="blue">
            <Heading scale="xl">Card Header</Heading>
          </UIKitCardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card>
          <UIKitCardHeader variant="violet">
            <Heading scale="xl">Card Header</Heading>
          </UIKitCardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card>
          <UIKitCardHeader variant="bubblegum">
            <Heading scale="xl">Card Header</Heading>
          </UIKitCardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
    </div>
  )
}

export const ImageCard = () => {
  return (
    <div style={{ padding: '32px', width: '500px' }}>
      <Card background="#f0c243" borderBackground="#b88700">
        <CardBody style={{ height: '150px' }} p={0}>
          <Image width={500} height={150} alt="" src="/src.png" isUseBlur />
        </CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    </div>
  )
}

export const CustomBackground: React.FC = () => {
  return (
    <div style={{ padding: '32px', width: '500px' }}>
      <Card background="#f0c243" borderBackground="#b88700">
        <CardBody style={{ height: '150px' }}>Custom background</CardBody>
      </Card>
    </div>
  )
}
