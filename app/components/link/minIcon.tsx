import { BorderColorProperty } from 'csstype'
import styled from 'styled-components'

interface TOutter {
  borderColor: BorderColorProperty
}

export default (props: TOutter) => <Icon {...props} />

const Icon = styled.i.attrs({
  style: ({ borderColor }: TOutter): any => ({
    borderColor
  })
})`
  --scale: 10px;

  width: var(--scale);
  height: var(--scale);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  margin: 0 1em 0 0;

  .active & {
    border-width: calc(var(--scale) / 2);
  }
` as any
