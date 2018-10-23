import Header from '@/components/header'
import withApolloClient from '@/lib/withApollo'
import themeVars from '@/theme'
import { ApolloClient } from 'apollo-boost'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import Tooltip from 'react-tooltip'
import { ThemeProvider } from 'styled-components'

import { Main } from './style'

export default withApolloClient(
  class extends App<{ apolloClient: ApolloClient<{}> }> {
    public render() {
      const { Component, router, pageProps, apolloClient } = this.props

      return (
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={themeVars}>
            <Container key={router.asPath}>
              <Main key={Math.random() + router.asPath}>
                <Header key={Math.random() + router.asPath} />

                <Component
                  key={Math.random() + router.asPath}
                  router={router}
                  {...pageProps}
                />

                <Tooltip effect="solid" />
              </Main>
            </Container>
          </ThemeProvider>
        </ApolloProvider>
      )
    }
  }
)
