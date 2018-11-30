import Particles from '@/components/Particles'
import withData from '@/lib/withData'
import { BaphoTheme } from '@/theme'
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
        <ThemeProvider theme={this.props.theme}>
          <ApolloProvider client={this.props.client}>
            <Container>
              <GlobalStyles />
              <Particles />
              <Layout Component={this.props.Component} />
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
