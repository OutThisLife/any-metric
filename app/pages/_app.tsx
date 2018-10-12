import Header from '@/components/header'
import withApolloClient from '@/lib/withApollo'
import themeVars, { focusStyles } from '@/theme'
import { ApolloClient } from 'apollo-boost'
import App, { Container } from 'next/app'
import { rgba } from 'polished'
import { ApolloProvider } from 'react-apollo'
import Tooltip from 'react-tooltip'
import styled, { css, ThemeProvider } from 'styled-components'

export default withApolloClient(
  class extends App<{ apolloClient: ApolloClient<{}> }> {
    public render() {
      const { Component, router, pageProps, apolloClient } = this.props

      return (
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={themeVars}>
            <Container key={router.asPath}>
              <Main key={Math.random() + router.asPath}>
                <Header key={Math.random() + router.asPath} />
                <Component
                  key={Math.random() + router.asPath}
                  router={router}
                  {...pageProps}
                />
                <Tooltip effect="solid" />
              </Main>
            </Container>
          </ThemeProvider>
        </ApolloProvider>
      )
    }
  }
)

const Main = styled.main`
  --pad: calc(8px + (16 - 9) * (100vw - 400px) / 1700);

  display: grid;
  grid-template-areas:
    'head head head'
    'body body body'
    'body body body';
  grid-template-rows: min-content 1fr;
  grid-template-columns: 1fr;
  height: 100vh;

  ${({ theme }) => css`
    * {
      &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        border-radius: 100px;
        background: ${rgba(theme.colours.base, 0.03)};
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 100px;
        background: ${theme.colours.base};
      }

      &::selection {
        color: #fff;
        background: ${theme.colours.secondary};
      }
    }

    > header {
      grid-area: head;
      display: grid;
      grid-template-columns: minmax(auto, 200px) 1fr;
      grid-template-areas: 'logo nav nav';
      align-items: center;

      > div {
        grid-area: logo;
      }

      > nav {
        grid-area: nav;
      }
    }

    > section {
      grid-area: body;
      position: relative;
      overflow: auto;
      background: ${theme.colours.panel};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 700;
      font-family: ${theme.fonts.family.title};
      margin: 0;
    }

    h2 {
      font-size: 2rem;
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

    a[href] {
      color: inherit;

      &:hover {
        color: ${theme.colours.secondary};
        text-decoration: underline;
      }
    }

    a,
    button,
    input {
      &:focus {
        ${focusStyles};
      }
    }

    [data-id='tooltip'] {
      font-size: 11px;
      padding: 2px 8px;
    }
  `};
`
