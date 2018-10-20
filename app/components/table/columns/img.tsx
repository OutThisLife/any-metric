import { Cell } from '.'
import { Image } from './style'

export default ({ cellData: img, rowData: { title } }: Cell<string>) => (
  <Image>
    <img src={img} alt={title} />
  </Image>
)
