import { Product } from '../types'
import create from './create'

export default create<Product>({
  collectionName: 'products',
  defaultValues: {
    bids: 0,
    image: '',
    isQuery: false,
    price: 0,
    qty: 0,
    shipping: 0,
    tags: [],
    url: ''
  }
})
