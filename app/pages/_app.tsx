import withData from '@/client/withData'
import Particles from '@/components/Particles'
import defaultTheme, { BaphoTheme } from '@/theme'
import { ApolloClient, gql } from 'apollo-boost'
import App, { AppProps, Container } from 'next/app'
import { ApolloProvider, DataProps, graphql } from 'react-apollo'
import { compose, defaultProps, withProps } from 'recompose'
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

const DynamicTheme = compose<BaphoTheme, {}>(
  defaultProps({
    theme: defaultTheme
  }),
  graphql(
    gql`
      {
        theme @client
      }
    `
  ),
  withProps<BaphoTheme, BaphoTheme & DataProps<{ theme: string }>>(
    ({ theme, data = {} }) => {
      if ('browser' in process && localStorage.getItem('theme') !== null) {
        theme = JSON.parse(localStorage.getItem('theme'))
      } else if ('theme' in data && typeof data.theme === 'string') {
        theme = JSON.parse(data.theme)
      }

      return { theme }
    }
  )
)(({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <Container>{children}</Container>
  </ThemeProvider>
))

export interface MyAppProps extends AppProps {
  client: ApolloClient<{}>
}
