import Box from '@/components/Box'
import Header from '@/components/Header'
import Particles from '@/components/Particles'
import withData from '@/lib/withData'
import theme from '@/theme'
import { ApolloClient } from 'apollo-boost'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import Tooltip from 'react-tooltip'
import { ThemeProvider } from 'styled-components'

import GlobalStyles, { Main } from './_app.styles'

export default withData(
  class extends App<{ apolloClient: ApolloClient<{}> }> {
    public static async getInitialProps({ Component }) {
      let pageProps = {}

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps()
      }

      return { pageProps }
    }

    public render() {
      const { apolloClient } = this.props

      return (
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
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

const Layout = ({ Component, pageProps }) => (
  <Box display="flex" alignItems="center" height="100vh" width="100vw">
    <Main
      id="app"
      position="relative"
      width="calc(100% - var(--offset))"
      height="calc(100% - var(--offset))"
      overflow="hidden"
      margin="auto"
      borderRadius={10}
      background={theme.colours.panelBg}
      backgroundBlendMode="overlay">
      <Header />
      <Component {...pageProps} />
    </Main>
  </Box>
)
