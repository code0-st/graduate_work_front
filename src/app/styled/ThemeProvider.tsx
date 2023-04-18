import { createContext, useState } from 'react'

import GlobalStyles from './GlobalStyles'

export type TMode = 'light' | 'dark'
export const ThemeContext = createContext({
  setTheme: (theme: TMode) => {},
  theme: 'light',
})

type Props = {
  children: React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<TMode>('light')
  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <GlobalStyles mode={theme} />
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
