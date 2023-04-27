import { Normalize } from 'styled-normalize'

import { MainPage } from '../pages'
import { ChartDataProvider } from './providers'
import ThemeProvider from './styled/ThemeProvider'

const App = () => (
  <ThemeProvider>
    <ChartDataProvider>
      <Normalize />
      <MainPage />
    </ChartDataProvider>
  </ThemeProvider>
)

export default App
