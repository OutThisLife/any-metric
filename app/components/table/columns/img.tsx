import { Cell } from '.'

export default ({ cellData: img, rowData: { title } }: Cell<string>) => (
  <figure style={{ width: 30, margin: 0 }}>
    <img src={img} alt={title} />
  </figure>
)
