import { PureComponent } from 'react'

import { FloatingFilterProps } from '..'

export default class extends PureComponent<FloatingFilterProps, {}> {
  constructor(props) {
    super(props)
  }

  public onParentModelChanged() {
    return
  }

  public handleChange = async ({ target }) => {
    await this.props.onFloatingFilterChanged({
      model: {
        filterType: 'object',
        type: 'equals',
        filter: target.value.trim(),
        filterTo: null
      }
    })
  }

  public render() {
    const { label, tags = [] } = this.props

    return (
      <select id="fq" onChange={this.handleChange}>
        <option defaultValue="" value="">
          {label}
        </option>

        {tags.map(t => (
          <option key={t._id} value={t._id}>
            {t.title}
          </option>
        ))}
      </select>
    )
  }
}
