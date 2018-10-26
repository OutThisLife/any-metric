import '../static/styles.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import Header from '@/components/header'
import withApolloClient from '@/lib/withApollo'
import theme, { GlobalStyles } from '@/theme'
import { ApolloClient } from 'apollo-boost'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import Tooltip from 'react-tooltip'
import { ThemeProvider } from 'styled-components'

export default withApolloClient(
  class extends App<{ apolloClient: ApolloClient<{}> }> {
    public render() {
      const { Component, router, pageProps, apolloClient } = this.props

      return (
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <GlobalStyles />

            <Container key={router.asPath}>
              <Header key={Math.random() + router.asPath} />
              <section>
                <Component
                  key={Math.random() + router.asPath}
                  router={router}
                  {...pageProps}
                />
              </section>
              <Tooltip effect="solid" />
            </Container>
          </ApolloProvider>
        </ThemeProvider>
      )
    }
  }
)
