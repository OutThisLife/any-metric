import { crawl, google } from './crawl'
import ebay from './ebay'
import products, { totalProducts } from './products'
import tags, { totalTags } from './tags'
import view from './view'

export default {
  find: async (_, { collectionName }, { mongo }) =>
    mongo
      .collection(collectionName)
      .find()
      .toArray(),

  crawl,
  ebay,
  google,

  products,
  totalProducts,

  tags,
  totalTags,

  view
}
