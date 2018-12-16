import { getCommerce } from '../../api'
import { EbayItem, EbayResult, Product, Resolver, Tag } from '../types'

export default (async (
  _,
  { keywords, save = false, ...args },
  { mongo }
): Promise<EbayResult> => {
  const {
    searchResult: [res]
  } = await getCommerce(
    Object.assign(args, {
      keywords,
      outputSelector: ['PictureURLSuperSize', 'SellerInfo', 'UnitPrice']
    })
  )

  if (typeof res === 'undefined') {
    console.error(res)

    return {
      total: 0,
      items: []
    }
  }

  const result: EbayResult = {
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

      return item
    })
  }

  if (save) {
    const q = { title: keywords, isQuery: true }
    await mongo.tags.updateOne(
      q,
      {
        $setOnInsert: {
          title: keywords,
          total: 0,
          isQuery: true,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      },
      { upsert: true }
    )

    const tag = await mongo.tags.findOne<Tag>(q)

    result.items.map(
      async ({
        listingInfo,
        pictureURLSuperSize = '',
        sellingStatus,
        shippingInfo,
        title,
        unitPrice = {},
        viewItemURL = 'javascript:;'
      }) => {
        const product = await mongo.products.findOne<Product>({
          title
        })

        if (product && product.isDeleted) {
          await mongo.products.updateOne(
            { title },
            { $set: { isDeleted: false, restoredAt: new Date() } }
          )
        } else {
          const { upsertedCount } = await mongo.products.updateOne(
            { title },
            {
              $setOnInsert: {
                bids:
                  'bidCount' in sellingStatus ? sellingStatus.bidCount[0] : 0,
                createdAt: new Date(listingInfo.startTime),
                image: pictureURLSuperSize,
                qty:
                  'quantity' in unitPrice ? parseFloat(unitPrice.quantity) : 0,
                status: sellingStatus.sellingState[0],
                tags: '_id' in tag ? [tag._id] : [],
                timeLeft: new Date(listingInfo.endTime),
                title,
                updatedAt: new Date(),
                url: viewItemURL,

                price:
                  'currentPrice' in sellingStatus
                    ? parseFloat(sellingStatus.currentPrice[0].__value__)
                    : 0,

                shipping:
                  'shippingServiceCost' in shippingInfo
                    ? parseFloat(shippingInfo.shippingServiceCost[0].__value__)
                    : 0
              }
            },
            { upsert: true }
          )

          await mongo.tags.updateOne(q, { $inc: { total: upsertedCount } })
        }
      }
    )
  }

  return result
}) as Resolver
