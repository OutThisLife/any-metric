import { lifecycle } from 'recompose'

export default <T extends {}>(map: Array<HotkeyMap<T>> = []) =>
  lifecycle({
    componentDidMount(this: any) {
      if (!('browser' in process)) {
        return
      }

      this.handleKeyDown = (e: KeyboardEvent) => {
        const handle = map.find(({ key }) => key === e.keyCode)

        if (
          handle &&
          'action' in handle &&
          !/input/i.test(document.activeElement.tagName)
        ) {
          handle.action(this.props)
        }
      }

      window.addEventListener('keydown', this.handleKeyDown.bind(this))
    },

    componentWillUnmount(this: any) {
      if (!('browser' in process)) {
        return
      }

      window.removeEventListener('keydown', this.handleKeyDown.bind(this))
    }
  })

export interface HotkeyMap<T> {
  key?: number
  action?: (props?: T) => void
}
