import { Layout } from "antd"
import { Header, Content } from "antd/es/layout/layout"
import { HeaderContent } from "./Header/Header"
import styled from "styled-components"

export const MainLayout = () => {
  const version = window.electron.currentVersion

  return (
    <Layout className="site-layout">
      <Header style={{ background: "white" }}>
        <HeaderContent />
      </Header>
      <Content>
        <ContentContainer>
          Content
        </ContentContainer>
      </Content>
      <VersionContainer>v.{version}</VersionContainer>
    </Layout>
  )
}

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
`

const VersionContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  margin: 0 4px 4px;

  color: #00000040
`
