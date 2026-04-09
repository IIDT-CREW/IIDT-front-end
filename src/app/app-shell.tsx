'use client'

import Menu from '@/components/Menu'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/Common/ErrorBoundary'
import ModalProvider from '@/components/Common/Modal/ModalContext'
import { ToastContextProvider } from '@/contexts/Toast'
import { ToastContainer } from 'react-toastify'
import { FOOTER_HEIGHT, MENU_HEIGHT } from '@/config/constants/default'
import useFooterDisable from '@/hooks/useFooterDisable'
import { useDarkMode } from '@/hooks/useDarkMode'

type AppShellProps = {
  children: React.ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  const [themeMode, toggleTheme] = useDarkMode()
  const isFooterDisable = useFooterDisable()

  return (
    <ErrorBoundary>
      <ToastContextProvider>
        <ModalProvider>
          <Menu themeMode={themeMode} toggleTheme={toggleTheme} />
          <main style={{ minHeight: `calc(100vh - ${MENU_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}>{children}</main>
          {!isFooterDisable && <Footer />}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            closeOnClick
            draggable={false}
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            hideProgressBar
          />
        </ModalProvider>
      </ToastContextProvider>
    </ErrorBoundary>
  )
}

export default AppShell
