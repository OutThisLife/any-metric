import Sidebar from '@/components/sidebar'
import withApolloClient from '@/lib/withApollo'
import { ApolloClient } from 'apollo-boost'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import styled from 'styled-components'

const Main = styled.main`
  display: flex;
  align-items: stretch;
  min-height: 100vh;

  section {
    width: 100%;
    padding: calc(var(--grid) * 3);

    > div {
      max-width: 768px;
      margin: auto;
    }
  }
`

export default withApolloClient(
  class extends App<{ apolloClient: ApolloClient<{}>}> {
    public render() {
      const { Component, pageProps, apolloClient } = this.props

      return (
        <Container>
          <ApolloProvider client={apolloClient}>
            <Main id="app">
              <Sidebar />

              <section>
                <Component {...pageProps} />
              </section>
            </Main>
          </ApolloProvider>
        </Container>
      )
    }
  }
)
