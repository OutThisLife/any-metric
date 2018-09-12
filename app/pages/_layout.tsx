import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import themeVars from '@/theme'
import styled, { ThemeProvider } from 'styled-components'

interface TInner {
  render: (a?: IObject) => JSX.Element
}

export default ({ render }: TInner) => (
  <ThemeProvider theme={themeVars}>
    <Main>
      <Header />

      <section>
        <Sidebar />
        <div>{render()}</div>
      </section>
    </Main>
  </ThemeProvider>
)

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
      box-shadow: inset 1px 0 0 0 ${({ theme }) => theme.scrollbar.bg}, inset 1px 0 0 1px ${({ theme }) => theme.colours.bg};
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
