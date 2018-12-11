import { getCommerce } from '../../api'
import { EbayItem, EbayResult, Resolver } from '../types'

export default (async (_, args = {}): Promise<EbayResult> => {
  const {
    searchResult: [res]
  } = await getCommerce(args)

  return {
    total: res['@count'] as number,
    items: (res.item as EbayItem[]).map(item => {
      for (const [k, v] of Object.entries(item)) {
        if (Array.isArray(v) && v.length === 1) {
          const kv = v.pop()

          if (typeof kv === 'string' && /false|true/.test(kv)) {
            item[k] = !(kv === 'false')
          } else {
            item[k] = kv
          }
        }
      }

      item._id = item.itemId
      delete item.itemId

      return item
    })
  }
}) as Resolver
