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

    if ('updateChart' in window) {
      ;(window as any).updateChart(d =>
        target.value.length
          ? d.tags.map(t => t.slug).includes(target.value.trim())
          : true
      )
    }
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
