const STYLE_PROP_KEYS = new Set([
  // space
  'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my',
  'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py',
  'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
  'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
  // layout
  'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'display', 'overflow',
  // position
  'position', 'top', 'right', 'bottom', 'left', 'zIndex',
  // background
  'background', 'backgroundColor', 'bg',
  // border
  'border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
  'borderColor', 'borderRadius', 'borderWidth',
  // flexbox
  'flexDirection', 'justifyContent', 'alignItems', 'flexWrap', 'flex',
  'alignContent', 'flexGrow', 'flexShrink', 'flexBasis', 'order', 'alignSelf',
  // grid
  'gridGap', 'gridRowGap', 'gridColumnGap', 'gridColumn', 'gridRow',
  'gridAutoFlow', 'gridAutoColumns', 'gridAutoRows',
  'gridTemplateColumns', 'gridTemplateRows', 'gridTemplateAreas', 'gridArea',
  // typography
  'fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'letterSpacing', 'textAlign',
  // color
  'color',
])

const SHORTHAND_MAP: Record<string, string> = {
  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  p: 'padding',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  bg: 'background',
}

export function extractStyleProps(props: Record<string, any>): {
  style: Record<string, any>
  rest: Record<string, any>
} {
  const style: Record<string, any> = {}
  const rest: Record<string, any> = {}

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined) {
      continue
    }

    if (!STYLE_PROP_KEYS.has(key)) {
      rest[key] = value
      continue
    }

    // Handle shorthand spacing
    if (key === 'mx') {
      style.marginLeft = value
      style.marginRight = value
    } else if (key === 'my') {
      style.marginTop = value
      style.marginBottom = value
    } else if (key === 'px') {
      style.paddingLeft = value
      style.paddingRight = value
    } else if (key === 'py') {
      style.paddingTop = value
      style.paddingBottom = value
    } else {
      const cssProp = SHORTHAND_MAP[key] || key
      style[cssProp] = value
    }
  }

  return { style, rest }
}
