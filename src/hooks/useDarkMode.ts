import { useEffect, useState } from 'react'

const isServer = typeof window === 'undefined'

function applyDarkClass(theme: string) {
  if (!isServer) {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }
}

export const useDarkMode = (): [string, () => void] => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (isServer) return

    const storedTheme = window.localStorage.getItem('theme')
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme)
      applyDarkClass(storedTheme)
      return
    }

    applyDarkClass('light')
  }, [])

  useEffect(() => {
    applyDarkClass(theme)
  }, [theme])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)
  }

  return [theme, toggleTheme]
}
