import { REMOVE_DOC } from '@/lib/queries'
import { PureComponent } from 'react'
import { Mutation } from 'react-apollo'

import { FloatingFilterProps } from '..'

export default class extends PureComponent<
  FloatingFilterProps,
  { value: string }
> {
  public state = { value: '' }

  constructor(props) {
    super(props)
  }

  public onParentModelChanged() {
    return
  }

  public componentDidUpdate(_, prevState) {
    if (prevState.value !== this.state.value) {
      this.props.onFloatingFilterChanged({
        model: {
          filterType: 'object',
          type: 'equals',
          filter: this.state.value,
          filterTo: null
        }
      })
    }
  }

  public render() {
    const { label, tags = [] } = this.props

    return (
      <>
        <select
          value={this.state.value}
          onChange={({ target }) =>
            this.setState({ value: target.value.trim() })
          }>
          <option value="">{label}</option>

          {tags.map(t => (
            <option key={t._id} value={t._id}>
              {t.title}
            </option>
          ))}
        </select>

        <Mutation mutation={REMOVE_DOC}>
          {mutate => (
            <>
              <a
                style={{
                  pointerEvents: this.state.value.length ? 'inherit' : 'none',
                  opacity: this.state.value.length ? 1 : 0.2
                }}
                href="javascript:;"
                onClick={() =>
                  mutate({
                    variables: {
                      objectId: this.state.value,
                      collectionName: 'tags'
                    }
                  })
                }>
                drop
              </a>
              &mdash;
              <a
                href="javascript:;"
                onClick={() =>
                  mutate({ variables: { collectionName: 'allTags' } })
                }>
                flushdb
              </a>
            </>
          )}
        </Mutation>
      </>
    )
  }
}
