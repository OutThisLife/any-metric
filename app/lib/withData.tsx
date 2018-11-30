import theme from '@/theme'
import ApolloClient from 'apollo-client'
import { omit } from 'lodash'
import Head from 'next/head'
import { Component } from 'react'
import { getDataFromTree } from 'react-apollo'
import { getDisplayName } from 'recompose'

import initApollo from './initApollo'

export default App =>
  class extends Component<{ serverState: any }> {
    public static displayName = `withApollo(${getDisplayName(App)})`

    public static async getInitialProps(ctx) {
      let serverState = {}

      const client = initApollo()

      await getDataFromTree(
        <App
          Component={ctx.Component}
          client={client}
          router={ctx.router}
          theme={theme}
        />,
        ctx
      )

      serverState = client.cache.extract() || {}

      if (!('browser' in process)) {
        Head.rewind()
      }

      return { serverState }
    }

    private client: ApolloClient<{}>

    constructor(props) {
      super(props)
      this.client = initApollo(this.props.serverState)
    }

    public render() {
      return (
        <App
          client={this.client}
          theme={theme}
          {...omit(this.props, ['serverState'])}
        />
      )
    }
  }
