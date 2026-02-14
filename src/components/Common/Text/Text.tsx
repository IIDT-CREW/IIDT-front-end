import { forwardRef } from 'react'
import cn from 'utils/cn'
import { TextProps } from './types'

const colorMap: Record<string, string> = {
  text: 'var(--color-text)',
  textPrimary: 'var(--color-text-primary)',
  textSubtle: 'var(--color-text-subtle)',
  textSecondary: 'var(--color-text-secondary)',
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  success: 'var(--color-success)',
  error: 'var(--color-error)',
  warning: 'var(--color-warning)',
  contrast: 'var(--color-contrast)',
  invertedContrast: 'var(--color-inverted-contrast)',
  grayscale0: 'var(--color-grayscale-0)',
  grayscale1: 'var(--color-grayscale-1)',
  grayscale2: 'var(--color-grayscale-2)',
  grayscale4: 'var(--color-grayscale-4)',
  grayscale5: 'var(--color-grayscale-5)',
  grayscale6: 'var(--color-grayscale-6)',
  grayscale7: 'var(--color-grayscale-7)',
}

function resolveColor(color?: string): string | undefined {
  if (!color) return 'var(--color-text)'
  return colorMap[color] || color
}

function resolveFontSize(fontSize?: string | string[]): string | undefined {
  if (!fontSize) return '18px'
  if (Array.isArray(fontSize)) {
    // Return the first defined value for base
    return fontSize.find((v) => v !== undefined && v !== null) || '18px'
  }
  return fontSize
}

const Text = forwardRef<HTMLDivElement, TextProps>(
  (
    {
      color = 'text',
      bold = false,
      small = false,
      ellipsis = false,
      textTransform,
      css: cssStyles,
      fontSize = '18px',
      fontWeight,
      fontFamily,
      lineHeight,
      letterSpacing,
      textAlign,
      display,
      width,
      height,
      m,
      mt,
      mb,
      ml,
      mr,
      p,
      pt,
      pb,
      pl,
      pr,
      padding,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const computedStyle: React.CSSProperties = {
      color: resolveColor(color),
      fontWeight: fontWeight ?? (bold ? 600 : 400),
      lineHeight: lineHeight ?? 1.5,
      fontSize: small ? '14px' : resolveFontSize(fontSize),
      ...(textTransform && { textTransform }),
      ...(fontFamily && { fontFamily }),
      ...(letterSpacing && { letterSpacing }),
      ...(textAlign && { textAlign: textAlign as React.CSSProperties['textAlign'] }),
      ...(display && { display }),
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
      ...(m !== undefined && { margin: m }),
      ...(mt !== undefined && { marginTop: mt }),
      ...(mb !== undefined && { marginBottom: mb }),
      ...(ml !== undefined && { marginLeft: ml }),
      ...(mr !== undefined && { marginRight: mr }),
      ...(p !== undefined && { padding: p }),
      ...(pt !== undefined && { paddingTop: pt }),
      ...(pb !== undefined && { paddingBottom: pb }),
      ...(pl !== undefined && { paddingLeft: pl }),
      ...(pr !== undefined && { paddingRight: pr }),
      ...(padding !== undefined && { padding }),
      ...cssStyles,
      ...style,
    }

    return (
      <div
        ref={ref}
        className={cn(
          ellipsis && 'whitespace-nowrap overflow-hidden text-ellipsis',
          className,
        )}
        style={computedStyle}
        {...rest}
      />
    )
  },
)

Text.displayName = 'Text'

export default Text
