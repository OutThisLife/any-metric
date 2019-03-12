import { EbayOperations, getCommerce } from '../../api'
import { EbayItem, EbayResult, Resolver, Tag } from '../types'

export default (async (
  _,
  {
    keywords,
    operation: op = 'findItemsByKeywords',
    save = false,
    ...args
  }: EbayArgs,
  { mongo }
): Promise<Result> => {
  const tag = await (async () => {
    const entry = await mongo.tags.findOne<Tag>({ title: keywords })

    if (entry === null) {
      const { insertedId } = await mongo.tags.insertOne({
        title: keywords,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      return mongo.tags.findOne({ _id: insertedId })
    }

    return entry
  })()

  const {
    searchResult: [sr = {}],
    paginationOutput: [pages]
  } = await getCommerce(
    Object.assign(args, {
      keywords,
      descriptionSearch: true,
      outputSelector: ['PictureURLSuperSize', 'SellerInfo', 'UnitPrice'],
      itemFilter: [
        {
          name: 'HideDuplicateItems',
          value: true
        }
      ]
    }),
    op
  )

  const res = {
    op,
    tag,
    total: parseInt(sr['@count'], 10),
    totalPages: Math.min(100, parseInt(pages.totalPages[0], 10)),
    totalEntries: parseInt(pages.totalEntries[0], 10),
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
  }

  if (save && res.items.length) {
    await mongo.products.bulkWrite(
      res.items.map(
        ({
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

          return {
            updateOne: {
              filter: { title },
              upsert: true,
              update: {
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
              }
            }
          }
        }
      )
    )
  }

  return res
}) as Resolver

type Result = EbayResult<number>

interface EbayArgs {
  keywords: string
  save?: boolean
  operation?: EbayOperations
  [key: string]: any
}
