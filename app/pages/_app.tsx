import withData from '@/client/withData'
import Particles from '@/components/Particles'
import defaultTheme, { BaphoTheme } from '@/theme'
import { ApolloClient, gql } from 'apollo-boost'
import App, { AppProps, Container } from 'next/app'
import { ApolloProvider, DataProps, graphql } from 'react-apollo'
import { compose, withProps } from 'recompose'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './_app.styles'
import Layout from './_layout'

export default withData(
  class extends App<MyAppProps> {
    public render() {
      return (
        <ApolloProvider client={this.props.client}>
          <Particles />

          <Inner>
            <GlobalStyles key="global-styles" />
            <Layout {...this.props} />
          </Inner>
        </ApolloProvider>
      )
    }
  }
)

const Inner = compose<BaphoTheme, {}>(
  graphql(gql`
    {
      theme @client
    }
  `),
  withProps<BaphoTheme, DataProps<{ theme: string }>>(({ data }) => {
    let theme = defaultTheme

    if ('theme' in data && typeof data.theme === 'string') {
      theme = JSON.parse(data.theme)
    } else if ('browser' in process && localStorage.getItem('theme')) {
      theme = JSON.parse(localStorage.getItem('theme'))
    }

    return { theme }
  })
)(({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <Container>{children}</Container>
  </ThemeProvider>
))

export interface MyAppProps extends AppProps {
  client: ApolloClient<{}>
}
