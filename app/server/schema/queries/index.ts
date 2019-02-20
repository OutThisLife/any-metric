import { crawl, google } from './crawl'
import ebay from './ebay'
import products, { totalProducts } from './products'
import tags, { totalTags } from './tags'

export default {
  crawl,
  ebay,
  google,

  products,
  totalProducts,

  tags,
  totalTags
}
