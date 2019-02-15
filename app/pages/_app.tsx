import withData from '@/client/withData'
import { ApolloClient } from 'apollo-boost'
import App, { AppProps, Container } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from 'react-apollo'
import { createGlobalStyle } from 'styled-components'

export default withData(
  class extends App<MyAppProps> {
    public render() {
      const { client, Component, pageProps } = this.props

      return (
        <ApolloProvider client={client}>
          <Container>
            <Head>
              <title key="title">$ɮΔք𝔥Ø𝔪Δ✞ʀɨჯ</title>
            </Head>

            <GlobalStyles />
            <Component {...pageProps} />
          </Container>
        </ApolloProvider>
      )
    }
  }
)

export interface MyAppProps extends AppProps {
  client: ApolloClient<{}>
}

const GlobalStyles = createGlobalStyle`
  * {
    font-family: Arial, sans-serif;
    font-size: 12px;
  }

  p, figure, h5 {
    margin: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  a {
    color: #0000ee;

    &:hover {
      color: #ee0000;
    }

    &:visited {
      color: #660066;
    }
  }

  input, select, textarea {
    display: block;
    width: inherit;
    margin: 4px 0;
    padding: 3px;
  }

  select {
    padding: 1px;
  }
`
