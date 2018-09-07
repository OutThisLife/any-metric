import Sidebar from '@/components/sidebar'
import withApolloClient from '@/lib/withApollo'
import { ApolloClient } from 'apollo-boost'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import styled from 'styled-components'

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

const Main = styled.main`
  --pad: 1vmax;

  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: minmax(100vh, 1fr);
`
