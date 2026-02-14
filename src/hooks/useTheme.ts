import { useTheme as useNextTheme } from 'next-themes'

export const THEME_TYPE = {
  DARK: 'dark',
  LIGHT: 'light',
}

const useTheme = () => {
  const { resolvedTheme, setTheme } = useNextTheme()
  return { isDark: resolvedTheme === 'dark', setTheme }
}

export default useTheme
