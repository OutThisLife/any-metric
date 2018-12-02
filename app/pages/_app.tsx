import withData from '@/client/withData'
import Particles from '@/components/Particles'
import { ApolloClient, gql } from 'apollo-boost'
import App, { AppProps, Container } from 'next/app'
import { ApolloProvider, DataProps, graphql } from 'react-apollo'
import { compose } from 'recompose'
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

const DynamicTheme = compose<DataProps<{ theme: { value: string } }>, {}>(
  graphql(
    gql`
      {
        theme {
          value
        }
      }
    `
  )
)(({ children, data: { theme } }) => (
  <ThemeProvider theme={JSON.parse(theme.value)}>
    <Container>{children}</Container>
  </ThemeProvider>
))

export interface MyAppProps extends AppProps {
  client: ApolloClient<{}>
}
