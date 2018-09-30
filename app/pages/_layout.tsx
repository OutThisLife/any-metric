import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import themeVars from '@/theme'
import { RouterProps, withRouter } from 'next/router'
import { compose, withProps } from 'recompose'
import styled, { ThemeProvider } from 'styled-components'

interface TOutter {
  render: (a?: any) => JSX.Element
  router?: RouterProps & {
    query: {
      slug?: string
    }
  }
}

interface TInner {
  getKey: (s?: string) => string
}

export default compose<TInner & TOutter, TOutter>(
  withRouter,
  withProps(({ router: { query }, ...props }) => ({
    ...props,
    getKey: (s = '') => `${s}${query.slug || 'home'}`
  }))
)(({ render, getKey }) => (
  <ThemeProvider theme={themeVars}>
    <Main key="main">
      <Header key={getKey('header')} />
      <Sidebar key={getKey('sidebar')} />
      <section id="app" key="app">{render({ getKey })}</section>
    </Main>
  </ThemeProvider>
))

const Main = styled.main`
  display: grid;
  grid-template-areas:
    "head head head"
    "side body body"
    "side body body";
  grid-template-rows: auto 1fr;
  grid-template-columns: 200px 1fr;
  height: 100vh;

  > header {
    grid-area: head;

    > h1 {
      width: 200px;
      margin-right: var(--pad);
    }
  }

  > aside {
    grid-area: side;
  }

  > section {
    grid-area: body;
    padding: calc(var(--pad) * 3);
    overflow: auto;
    height: 100%;
    background: ${({ theme }) => theme.colours.panel};

    > div {
      border-radius: 10px;
      background: ${({ theme }) => theme.colours.bg};
    }
  }

  * {
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      /* background: ${({ theme }) => theme.colours.brand.bg}; */
    }

    &:focus,
    &:active {
      outline: none;
    }
  }

  select {
    cursor: pointer;
  }
`
