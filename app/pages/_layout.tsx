import Header from '@/components/header'
import themeVars from '@/theme'
import { RouterProps, withRouter } from 'next/router'
import { rgba, timingFunctions } from 'polished'
import styled, { css, ThemeProvider } from 'styled-components'

interface TOutter {
  render: (a?: any) => JSX.Element
  router?: RouterProps & {
    query: {
      slug?: string
    }
  }
}

export default withRouter(({ render }: TOutter) => (
  <ThemeProvider theme={themeVars}>
    <Main key={Math.random()}>
      <Header />
      <section id="app">{render()}</section>
    </Main>
  </ThemeProvider>
))

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
    }

    *::selection {
      color: ${theme.colours.brand.bg};
      background: ${theme.colours.base};
    }

    > header {
      grid-area: head;
      display: grid;
      grid-template-columns: minmax(auto, 200px) 1fr;
      grid-template-areas: 'logo nav nav';
      align-items: center;

      > nav {
        grid-area: nav;
      }

      > h1 {
        grid-area: logo;
        height: 100%;
        line-height: 0;

        span {
          vertical-align: middle;
        }
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
      font-weight: 500;
      font-family: inherit;
      margin: 0;
    }

    h1 {
      font-family: ${theme.fonts.family.title};
    }

    p,
    blockquote,
    ul,
    li {
      margin: 0;
      padding: 0;
    }

    img, svg, object, embed, video, audio, iframe {
      max-width: 100%;
      height: auto;
      vertical-align: middle;
    }

    a[href] {
      color: inherit;
      transition: color 0.2s ${timingFunctions('easeInCubic')};

      &:hover {
        color: ${theme.colours.brand.bg};
      }
    }
  `};
`
