import { PureComponent } from 'react'

import { FloatingFilterProps } from '..'

export default class extends PureComponent<
  FloatingFilterProps & { maxValue: number },
  {}
> {
  constructor(props) {
    super(props)
  }

  public onParentModelChanged() {
    return
  }

  public handleChange = async ({ target }) => {
    await this.props.onFloatingFilterChanged({
      model: {
        filterType: 'number',
        type: 'greaterThan',
        filter: target.value.trim(),
        filterTo: null
      }
    })
  }

  public render() {
    return (
      <input
        type="range"
        min={0}
        max={this.props.maxValue || 10e3}
        step={1}
        onChange={this.handleChange}
      />
    )
  }
}
