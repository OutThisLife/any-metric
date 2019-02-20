import { REMOVE_DOC } from '@/lib/queries'
import { ApolloClient } from 'apollo-boost'
import { PureComponent } from 'react'
import { graphql, MutationFn, withApollo } from 'react-apollo'
import { compose, withHandlers, withState } from 'recompose'

import { FloatingFilterProps } from '..'

export default compose<DropdownFilterHandles, {}>(
  withState('value', 'setValue', ''),
  withApollo,
  graphql<DropdownFilterProps>(REMOVE_DOC, {
    props: ({ mutate, data, ownProps: { client } }) => ({
      data,
      mutate: async opts => {
        await mutate(opts)
        await client.reFetchObservableQueries()
      }
    })
  }),
  withHandlers<DropdownFilterProps, DropdownFilterHandles>(({ mutate }) => ({
    handleFlush: () => () =>
      mutate({ variables: { collectionName: 'allTags' } }),

    handleDrop: ({ value }) => () =>
      mutate({
        variables: {
          objectId: value,
          collectionName: 'tags'
        }
      })
  }))
)(
  class extends PureComponent<DropdownFilterProps, {}> {
    public static defaultProps = {
      handleDrop: () => null,
      handleFlush: () => null
    }

    constructor(props) {
      super(props)
    }

    public onParentModelChanged() {
      return
    }

    public componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        this.props.onFloatingFilterChanged({
          model: {
            filterType: 'object',
            type: 'equals',
            filter: this.props.value,
            filterTo: null
          }
        })
      }
    }

    public render() {
      const {
        label,
        value,
        tags = [],
        setValue,
        handleDrop,
        handleFlush
      } = this.props

      return (
        <>
          <select
            value={value}
            onChange={({ target }) => setValue(target.value.trim())}>
            <option value="">{label}</option>

            {tags.map(t => (
              <option key={t._id} value={t._id}>
                {t.title}
              </option>
            ))}
          </select>
          <a
            style={{
              pointerEvents: value.length ? 'inherit' : 'none',
              opacity: value.length ? 1 : 0.2
            }}
            href="javascript:;"
            onClick={handleDrop}>
            drop
          </a>
          &mdash;
          <a href="javascript:;" onClick={handleFlush}>
            flushdb
          </a>
        </>
      )
    }
  }
)

export interface DropdownFilterProps
  extends FloatingFilterProps,
    DropdownFilterHandles {
  value?: string
  setValue?: (v: string) => void
  mutate?: MutationFn
  client?: ApolloClient<{}>
  [key: string]: any
}

export interface DropdownFilterHandles {
  handleDrop: React.MouseEventHandler<HTMLAnchorElement>
  handleFlush: React.MouseEventHandler<HTMLAnchorElement>
}
