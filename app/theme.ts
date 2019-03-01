import { shade, tint } from 'polished'
import { ThemeProps } from 'styled-components'

export const siteName = '$ɮΔք𝔥Ø𝔪Δ✞ʀɨჯ'

const createTheme = () => ({
  base: '#000',
  brand: '#1c1c9c',
  bg: '#FFEEE3',

  get border() {
    return shade(0.1, this.bg)
  },

  get panel() {
    return tint(0.3, this.bg)
  }
})

const theme = createTheme()

export type BaphoTheme = Partial<ThemeProps<typeof theme>>
export default theme
