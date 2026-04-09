const isTouchDevice = (): boolean => {
  const nav = typeof navigator !== 'undefined' ? (navigator as Navigator & { msMaxTouchPoints?: number }) : undefined

  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || (nav?.maxTouchPoints ?? 0) > 0 || (nav?.msMaxTouchPoints ?? 0) > 0)
  )
}

export default isTouchDevice
