import { ApolloClient } from 'apollo-boost'
import Head from 'next/head'
import { Component } from 'react'
import { getDataFromTree } from 'react-apollo'

import initApollo from './initApollo'

export default App =>
  class extends Component {
    public static displayName = 'withApollo(App)'

    public static async getInitialProps(ctx) {
      let appProps = {}
      const apollo = initApollo()

      try {
        if (App.getInitialProps) {
          appProps = await App.getInitialProps(ctx)
        }

        await getDataFromTree(
          <App {...appProps} apolloClient={apollo} {...ctx} />
        )

        if (!('browser' in process)) {
          Head.rewind()
        }
      } catch (err) {
        console.error(err)
      }

      return {
        ...appProps,
        apolloState: apollo.cache.extract()
      }
    }

    private apolloClient: ApolloClient<{}>

    constructor(props) {
      super(props)
      this.apolloClient = initApollo(props.apolloState)
    }

    public render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
