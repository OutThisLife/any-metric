import styled from 'styled-components'

import { Cell } from '.'

export default ({ cellData: img, rowData: { title } }: Cell<string>) => (
  <Image>
    <img src={img} alt={title} />
  </Image>
)

const Image = styled.figure`
  margin: 0;
`
