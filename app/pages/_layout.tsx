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
    background: ${({ theme }) => theme.main.bg};

    > div {
      padding: var(--pad);
    }
  }

  * {
    &::-webkit-scrollbar {
      width: 11px;
      border: 1px solid ${({ theme }) => theme.scrollbar.border};
      background-color: ${({ theme }) => theme.scrollbar.bg};
    }

    &::-webkit-scrollbar-thumb {
      border: 1px solid ${({ theme }) => theme.scrollbar.border};
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.scrollbar.bg};
      background-color: ${({ theme }) => theme.scrollbar.thumb};
    }

    &:focus,
    &:active {
      outline: none;
    }
  }

  .Resizer {
    z-index: 1;
    border-right: 1px solid ${({ theme }) => theme.colours.border};

    &.vertical {
      cursor: col-resize;
      width: 11px;
      margin-left: -11px;
    }
  }

  select {
    cursor: pointer;
  }
`
