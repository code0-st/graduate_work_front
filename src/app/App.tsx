import { Normalize } from 'styled-normalize'

import { MainPage } from '../pages'
import { ChartDataProvider, MetricsProvider } from './providers'
import ThemeProvider from './styled/ThemeProvider'

const App = () => (
  <ThemeProvider>
    <ChartDataProvider>
      <MetricsProvider>
        <Normalize />
        <MainPage />
      </MetricsProvider>
    </ChartDataProvider>
  </ThemeProvider>
)

export default App
