import { Tag } from '../types'
import create from './create'

export default create<Tag>({
  collectionName: 'tags',
  defaultValues: {
    isQuery: false,
    total: 0
  }
})
