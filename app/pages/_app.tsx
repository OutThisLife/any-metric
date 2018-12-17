import withData from '@/client/withData'
import GetTheme from '@/client/withTheme'
import Particles from '@/components/Particles'
import { ApolloClient } from 'apollo-boost'
import App, { AppProps, Container } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from 'react-apollo'

import GlobalStyles from './_app.styles'
import Layout from './_layout'

export default withData(
  class extends App<MyAppProps> {
    public render() {
      return (
        <ApolloProvider client={this.props.client}>
          <GetTheme>
            {({ theme }) => (
              <Container>
                <Particles />

                <Head>
                  <link
                    key="google-fonts"
                    rel="stylesheet"
                    href={theme.fonts.src}
                  />
                </Head>
                <GlobalStyles />
                <Layout {...this.props} />
              </Container>
            )}
          </GetTheme>
        </ApolloProvider>
      )
    }
  }
)

export interface MyAppProps extends AppProps {
  client: ApolloClient<{}>
}
