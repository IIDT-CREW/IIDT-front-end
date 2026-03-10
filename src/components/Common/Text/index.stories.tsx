import React from 'react'
import { Text, TooltipText } from '.'

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    bold: {
      name: 'bold',
      table: {
        type: { summary: 'bool', detail: 'Bold the text' },
        defaultValue: { summary: false },
      },
      control: {
        type: null,
      },
    },
    fontSize: {
      name: 'fontSize',
      table: {
        type: { summary: 'string', detail: 'Fontsize in px or em' },
        defaultValue: { summary: '16px' },
      },
      control: {
        type: null,
      },
    },
    color: {
      name: 'color',
      table: {
        type: { summary: 'string', detail: 'Color from the theme, or CSS color' },
        defaultValue: { summary: 'theme.colors.text' },
      },
      control: {
        type: null,
      },
    },
  },
}

export const Default: React.FC = () => {
  return (
    <div>
      <Text>Default</Text>
      <Text bold>Bold text</Text>
      <Text small>Small text</Text>
      <Text className="text-2xl">Custom fontsize</Text>
      <Text className="text-red-500">Custom color</Text>
      <Text color="primary">Custom color from theme</Text>
      <Text color="secondary" className="uppercase">
        with text transform
      </Text>
      <Text className="text-center">center</Text>
      <Text as="span" color="subtle" className="inline uppercase">
        Example of{' '}
      </Text>
      <Text as="span" bold className="inline uppercase">
        inline{' '}
      </Text>
      <Text as="span" color="subtle" className="inline uppercase">
        Text
      </Text>
      <Text ellipsis className="w-[250px]">
        Ellipsis: a long text with an ellipsis just for the example
      </Text>
    </div>
  )
}

export const TooltipTextVariant: React.FC = () => {
  return (
    <div>
      <Text>Use TooltipText for text that has tooltip, it accepts the same props as normal Text component</Text>
      <TooltipText>Example</TooltipText>
    </div>
  )
}
