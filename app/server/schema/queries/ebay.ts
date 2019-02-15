import { EbayOperations, getCommerce } from '../../api'
import { EbayItem, EbayResult, Resolver, Tag } from '../types'

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
            searchResult: [sr = {}],
            paginationOutput: [pages]
          } = await getCommerce(
            Object.assign(args, {
              keywords,
              outputSelector: ['PictureURLSuperSize', 'SellerInfo', 'UnitPrice']
            }),
            op
          )

          resolve({
            op,
            total: parseInt(pages.totalEntries[0], 10),
            totalPages: parseInt(pages.totalPages[0], 10),
            items: ('item' in sr ? (sr.item as EbayItem[]) : []).map(item => {
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
      total: (acc.total as number) += r.total as number,
      items: acc.items.concat(...r.items)
    }),
    {
      total: 0,
      items: []
    }
  )

  if (save) {
    res.total = 0

    const q = { title: keywords }
    await mongo.tags.updateOne(
      q,
      {
        $setOnInsert: {
          title: keywords,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      },
      { upsert: true }
    )

    if (res.items.length) {
      const tag = await mongo.tags.findOne<Tag>(q)

      res.items.map(
        async ({
          listingInfo,
          pictureURLSuperSize = '',
          sellingStatus,
          sellerInfo,
          shippingInfo,
          title,
          unitPrice = {},
          viewItemURL = 'javascript:;'
        }) => {
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

          const username =
            'sellerUserName' in sellerInfo
              ? sellerInfo.sellerUserName[0].__value__
              : 'anonymous'

          await mongo.products.updateOne(
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
                url,
                username
              }
            },
            { upsert: true }
          )
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
