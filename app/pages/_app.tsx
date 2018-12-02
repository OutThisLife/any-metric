import withData from '@/client/withData'
import Particles from '@/components/Particles'
import { getTheme } from '@/lib/queries'
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
          <Particles />

          <DynamicTheme>
            <GlobalStyles />
            <Layout {...this.props} />
          </DynamicTheme>
        </ApolloProvider>
      )
    }
  }
)

const DynamicTheme = getTheme()(({ children, data: { theme } }) => (
  <ThemeProvider theme={JSON.parse(theme.value)}>
    <Container>{children}</Container>
  </ThemeProvider>
))

export interface MyAppProps extends AppProps {
  client: ApolloClient<{}>
}
