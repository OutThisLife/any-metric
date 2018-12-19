import { EbayOperations, getCommerce } from '../../api'
import { EbayItem, EbayResult, Product, Resolver, Tag } from '../types'

export default (async (
  _,
  { keywords, save = false, ...args }: EbayArgs,
  { mongo }
): Promise<EbayResult> => {
  const operations = ['findItemsByKeywords', 'findCompletedItems']

  const res = (await Promise.all<EbayResult>(
    operations.map(
      (op: EbayOperations) =>
        new Promise(async resolve => {
          const {
            searchResult: [sr]
          } = await getCommerce(
            Object.assign(args, {
              keywords,
              outputSelector: ['PictureURLSuperSize', 'SellerInfo', 'UnitPrice']
            }),
            op
          )

          resolve({
            op,
            total: parseInt(sr['@count'], 10),
            items: (sr.item as EbayItem[]).map(item => {
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
          })
        })
    )
  )).reduce(
    (acc: EbayResult, r: EbayResult) => ({
      ...r,
      total: acc.total += r.total,
      items: acc.items.concat(...r.items)
    }),
    {
      total: 0,
      items: []
    }
  )

  if (save) {
    res.total = 0

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

    if (res.items.length) {
      const tag = await mongo.tags.findOne<Tag>(q)
      await mongo.tags.updateOne(q, { $set: { isDeleted: false } })

      res.items.map(
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

          if (product) {
            await mongo.products.updateOne(
              { title },
              { $set: { isDeleted: false, restoredAt: new Date() } }
            )
          } else {
            const createdAt = new Date(listingInfo.startTime)
            const image = pictureURLSuperSize
            const status = sellingStatus.sellingState[0]
            const tags = [tag._id]
            const timeLeft = new Date(listingInfo.endTime)
            const updatedAt = new Date()
            const url = viewItemURL

            const bids =
              'bidCount' in sellingStatus ? sellingStatus.bidCount[0] : 0

            const qty =
              'quantity' in unitPrice ? parseFloat(unitPrice.quantity) : 0

            const price =
              'currentPrice' in sellingStatus
                ? parseFloat(sellingStatus.currentPrice[0].__value__)
                : 0

            const shipping =
              'shippingServiceCost' in shippingInfo
                ? parseFloat(shippingInfo.shippingServiceCost[0].__value__)
                : 0

            const { upsertedCount } = await mongo.products.updateOne(
              { title },
              {
                $setOnInsert: {
                  bids,
                  createdAt,
                  image,
                  price,
                  qty,
                  shipping,
                  status,
                  tags,
                  timeLeft,
                  title,
                  updatedAt,
                  url
                }
              },
              { upsert: true }
            )

            await mongo.tags.updateOne(q, { $inc: { total: upsertedCount } })
            res.total += upsertedCount
          }
        }
      )
    }
  }

  return res
}) as Resolver

interface EbayArgs {
  keywords: string
  save?: boolean
  operation?: EbayOperations
  [key: string]: any
}
