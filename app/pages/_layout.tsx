import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import themeVars from '@/theme'
import { IObject } from '@types'
import { RouterProps, withRouter } from 'next/router'
import { compose, withProps } from 'recompose'
import styled, { ThemeProvider } from 'styled-components'

interface TOutter {
  render: (a?: IObject) => JSX.Element
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

      <section>
        <Sidebar key={getKey('sidebar')} />
        <div key="app">{render({ getKey })}</div>
      </section>
    </Main>
  </ThemeProvider>
))

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  > section {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 1fr;
    position: relative;
  }

  * {
    &::-webkit-scrollbar {
      width: 11px;
      border: 1px solid ${({ theme }) => theme.scrollbar.bg};
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      box-shadow: inset 1px 0 0 0 ${({ theme }) => theme.scrollbar.bg},
        inset 1px 0 0 1px ${({ theme }) => theme.colours.bg};
      background: ${({ theme }) => theme.scrollbar.thumb};
    }

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
