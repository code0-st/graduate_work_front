import { Layout } from 'antd'
import FileLoader from 'features/file-loader/ui/FileLoader'
import styled from 'styled-components'

const { Content, Footer, Header } = Layout

const Title = styled.div`
  text-align: center;
  font-size: 18px;
  color: var(--color-white);
`

const StyledHeader = styled(Header)`
  background-color: var(--color-bg-3);
`
const StyledLayout = styled(Layout)`
  width: 100%;
  height: 100%;
`
const StyledFooter = styled(Footer)`
  text-align: center;
  background-color: var(--color-bg-4);
`

const MainPage = () => (
  <StyledLayout>
    <StyledHeader>
      <Title>Загрузите .csv файл</Title>
    </StyledHeader>
    <Content>
      <FileLoader />
    </Content>
    <StyledFooter>Chumarenko Kirill`s graduate work ©2023 Created by code0_st</StyledFooter>
  </StyledLayout>
)

export default MainPage
