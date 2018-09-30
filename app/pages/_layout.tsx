import Header from '@/components/header'
import themeVars from '@/theme'
import { RouterProps, withRouter } from 'next/router'
import styled, { ThemeProvider } from 'styled-components'

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
    <Main>
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

  * {
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colours.brand.bg};
    }

    &:focus,
    &:active {
      outline: none;
    }
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
    }
  }

  > section {
    grid-area: body;
    position: relative;
    overflow: auto;
    background: ${({ theme }) => theme.colours.panel};
  }

  h1,
  h2,
  h3 {
    font-family: ${({ theme }) => theme.fonts.family.title};
  }

  h5,
  h6 {
    text-transform: uppercase;
  }

  ::selection {
    color: ${({ theme }) => theme.colours.brand.bg};
    background: ${({ theme }) => theme.colours.brand.colour};
  }

  *:focus {
    outline: 5px auto -webkit-focus-ring-color;
  }
`
