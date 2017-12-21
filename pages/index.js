import dynamic from 'next/dynamic'
import styled, { injectGlobal } from 'styled-components'
import globalStyles from './global.scss'
import Sidebar from '../components/sidebar'

const Templates = {
  '/': dynamic(import('./home')),
  'report': dynamic(import('./report'))
}

injectGlobal`${globalStyles}`

const Main = styled.main`
display: flex;
align-items: stretch;
min-height: 100vh;

section {
  width: 100%;
  padding: calc(var(--grid) * 3);

  h1 {
    font-size: calc(24px + (40 - 24) * (100vw - 400px) / (2000 - 400));
    margin: 0 0 25px;
  }
}
`

export default ({ url }) => {
  const Dummy = Templates[url.query.page || '/']

  return (
    <Main>
      <Sidebar {...url} />

      <section>
        <Dummy {...url} />
      </section>
    </Main>
  )
}
