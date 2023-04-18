import { Normalize } from 'styled-normalize'

import { MainPage } from '../pages'
import ThemeProvider from './styled/ThemeProvider'

const App = () => (
  <ThemeProvider>
    <Normalize />
    <MainPage />
  </ThemeProvider>
)

export default App
