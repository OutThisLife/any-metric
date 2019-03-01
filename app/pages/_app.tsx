import withData from '@/client/withData'
import theme, { BaphoTheme } from '@/theme'
import { ApolloClient } from 'apollo-boost'
import App, { AppProps, Container } from 'next/app'
import Head from 'next/head'
import { darken, desaturate } from 'polished'
import { ApolloProvider } from 'react-apollo'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { prop, withProp } from 'styled-tools'

export default withData(
  class extends App<MyAppProps> {
    public render() {
      const { client, Component, pageProps } = this.props

      return (
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
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

const GlobalStyles = createGlobalStyle<BaphoTheme>`
  * {
    cursor: crosshair;
    font-family: Arial, sans-serif;
    font-size: 12px;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background: ${prop('theme.panel')};
  }

  ::-webkit-scrollbar-thumb {
    background: ${prop('theme.base')};
  }

  ::selection {
    color: ${prop('theme.bg')};
    background: ${prop('theme.base')};
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
    cursor: pointer;
    color: ${prop('theme.brand')};

    &:not(:hover) {
      text-decoration: none;
    }

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
    cursor: text;
    display: block;
    width: inherit;
    margin: 4px 0;
    padding: 3px;
    border: 1px solid ${prop('theme.border')};
    background: ${prop('theme.panel')};

    &:focus {
      border-color: ${withProp(prop('theme.border'), darken(0.2))};;
    }
  }

  select {
    cursor: pointer;
    padding: 2.5px;
  }
`
