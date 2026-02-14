import { useState, useEffect } from 'react'
const isServer = typeof window === 'undefined'

function applyDarkClass(theme: string) {
  if (!isServer) {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }
}

export const useDarkMode = (): [string, () => void] => {
  const localTheme = !isServer && window.localStorage.getItem('theme')
  const initialState = localTheme ? localTheme : 'light'
  const [theme, setTheme] = useState(initialState)

  useEffect(() => {
    applyDarkClass(theme)
  }, [theme])

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      window.localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }

  return [theme, toggleTheme]
}
