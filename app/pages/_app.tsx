import Particles from '@/components/Particles'
import withData from '@/lib/withData'
import { BaphoTheme } from '@/theme'
import { ApolloClient } from 'apollo-boost'
import App, { AppProps, Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import Tooltip from 'react-tooltip'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './_app.styles'
import Layout from './_layout'

export default withData(
  class extends App<MyAppProps> {
    public static async getInitialProps({ Component }) {
      let pageProps = {}

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps()
      }

      return { pageProps }
    }

    public render() {
      const { theme, client } = this.props

      return (
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Container>
              <Layout {...this.props} />

              <GlobalStyles />
              <Tooltip effect="solid" />
              <Particles />
            </Container>
          </ApolloProvider>
        </ThemeProvider>
      )
    }
  }
)

export interface MyAppProps extends AppProps {
  client: ApolloClient<{}>
  theme: BaphoTheme
}
