import withData from '@/client/withData'
import theme from '@/theme'
import { ApolloClient } from 'apollo-boost'
import App, { AppProps, Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './_app.styles'
import Layout from './_layout'

export default withData(
  class extends App<MyAppProps> {
    public render() {
      return (
        <ApolloProvider client={this.props.client}>
          <ThemeProvider theme={theme}>
            <Container>
              <GlobalStyles />
              <Layout {...this.props} />
            </Container>
          </ThemeProvider>
        </ApolloProvider>
      )
    }
  }
)

export interface MyAppProps extends AppProps {
  client: ApolloClient<{}>
}
