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
      <section key="app">{render({ getKey })}</section>
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
  }

  > aside {
    grid-area: side;
  }

  > section {
    grid-area: body;
  }

  * {
    /* &::-webkit-scrollbar {
      width: 6px;
      height: 3px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.scrollbar.thumb};
    } */

    &:focus,
    &:active {
      outline: none;
    }
  }

  .Resizer {
    z-index: 1;
    border-right: 4px double ${({ theme }) => theme.scrollbar.bg};

    &.vertical {
      cursor: col-resize;
      width: 11px;
    }
  }

  select {
    cursor: pointer;
  }
`
