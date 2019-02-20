import withData from '@/client/withData'
import { ApolloClient } from 'apollo-boost'
import App, { AppProps, Container } from 'next/app'
import Head from 'next/head'
import { complement, desaturate, invert } from 'polished'
import { ApolloProvider } from 'react-apollo'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { prop, withProp } from 'styled-tools'

export default withData(
  class extends App<MyAppProps> {
    public render() {
      const { client, Component, pageProps } = this.props

      return (
        <ApolloProvider client={client}>
          <ThemeProvider
            theme={{
              base: '#000',
              bg: '#fff',
              border: '#d9dcde',
              panel: '#f5f7f7',
              brand: '#0000ee'
            }}>
            <Container>
              <Head>
                <title key="title">$ɮΔք𝔥Ø𝔪Δ✞ʀɨჯ</title>
              </Head>

              <GlobalStyles />
              <Component {...pageProps} />
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

const GlobalStyles = createGlobalStyle`
  * {
    font-family: Arial, sans-serif;
    font-size: 12px;
  }

  body {
    background: ${prop('theme.bg')};
  }

  p, figure, h5 {
    margin: 0;
  }

  img, svg {
    max-width: 100%;
    height: auto;
  }

  a {
    color: ${prop('theme.brand')};

    &:hover {
      color: ${prop('theme.base')};
    }

    &:visited {
      color: ${withProp(prop('theme.brand'), desaturate(0.8))};
    }

    .active & {
      color: ${prop('theme.base')};
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
