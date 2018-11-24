import Header from '@/components/Header'
import withData from '@/lib/withData'
import theme from '@/theme'
import { ApolloClient } from 'apollo-boost'
import App, { Container } from 'next/app'
import { between, rgba } from 'polished'
import { ApolloProvider } from 'react-apollo'
import Tooltip from 'react-tooltip'
import { createGlobalStyle, css, ThemeProvider } from 'styled-components'

export default withData(
  class extends App<{ apolloClient: ApolloClient<{}> }> {
    public render() {
      const { Component, router, pageProps, apolloClient } = this.props
      pageProps.router = router

      return (
        <ApolloProvider client={apolloClient}>
          <Container>
            <ThemeProvider theme={theme}>
              <>
                <Header />
                <Component {...pageProps} />

                <GlobalStyles />
                <Tooltip effect="solid" />
              </>
            </ThemeProvider>
          </Container>
        </ApolloProvider>
      )
    }
  }
)

const GlobalStyles = createGlobalStyle`
  :root {
    --cellSize: calc(100vw / 40);
    --pad: ${between('8px', '16px')};
  }

  ${({ theme: { colours, fonts } }: any) => css`
    body,
    html {
      color: ${colours.base};
      font-weight: 400;
      font-family: ${fonts.family.copy};
      text-shadow: 0 1px 0 ${rgba(colours.base, 0.1)};
      line-height: 1.75;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    * {
      box-sizing: border-box;

      &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
        border: 1px ridge transparent;
        background: transparent;
      }

      &::-webkit-scrollbar:hover {
        border-color: ${rgba(colours.base, 0.1)};
        background: ${rgba(colours.base, 0.03)};
      }

      &::-webkit-scrollbar-thumb {
        transition: 0.15s ease-in-out;
        background: ${colours.base};

        *:not(:hover) & {
          background: ${rgba(colours.base, 0.2)};
        }
      }

      &::selection {
        color: #fff;
        background: ${colours.secondary};
      }
    }

    p,
    blockquote,
    ul,
    li {
      margin: 0;
      padding: 0;
    }

    img,
    svg,
    object,
    embed,
    video,
    audio,
    iframe {
      max-width: 100%;
      height: auto;
      vertical-align: middle;
    }

    [data-id='tooltip'] {
      font-size: 11px;
      padding: 2px 8px;
      transition: none;
    }

    input + button,
    select + button {
      margin-left: -3px !important;
      border-left: 0px !important;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }

    a[href]:hover {
      color: ${colours.secondary};
    }

    #__next {
      display: grid;
      grid-template-areas:
        'head head head'
        'body body body'
        'body body body';
      grid-template-rows: min-content max-content;
      grid-template-columns: 1fr;
      overflow-x: hidden;
      background: ${colours.panel};

      > header {
        grid-area: head;
      }

      > main {
        align-self: stretch;
        grid-area: body;
        position: relative;
        background: ${colours.panel};
      }
    }
  `}
`
