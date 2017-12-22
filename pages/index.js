import { Component } from 'react'
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

  > div {
    max-width: 768px;
    margin: auto;
  }
}
`

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = { data: [] }
  }

  handleUpdate (data, done) {
    this.setState({ data }, () => done ? done(data[data.length - 1]) : 1)
  }

  componentWillMount () {
    if (typeof localStorage !== 'undefined') {
      this.setState(JSON.parse(localStorage.getItem('data')))
    }
  }

  componentDidUpdate () {
    localStorage.setItem('data', JSON.stringify(this.state))
  }

  render () {
    const { url } = this.props
    const Dummy = Templates[this.state.data.length > 0 ? (url.query.page || '/') : '/']
    const props = {
      ...url,
      ...this.state,
      handle: this.handleUpdate.bind(this)
    }

    return (
      <Main>
        <Sidebar {...props} />

        <section>
          <div>
            <Dummy {...props} />
          </div>
        </section>
      </Main>
    )
  }
}
