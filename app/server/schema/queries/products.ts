import { Product, Resolver, Tag } from '../types'

export default (async (
  _,
  {
    paginationInput = {
      pageNumber: 1,
      entriesPerPage: 1000
    }
  },
  { mongo }
): Promise<Product[]> => {
  const tags = await mongo.tags.find<Tag>().toArray()

  return (await mongo.products
    .find<Product>({
      status: {
        $ne: 'EndedWithoutSales'
      }
    })
    .skip(paginationInput.entriesPerPage * (paginationInput.pageNumber - 1))
    .limit(paginationInput.entriesPerPage)
    .toArray()).map(d => ({
    ...d,
    tags: (d.tags as any[])
      .map(t =>
        tags.find(tt => {
          if (typeof t === 'object' && 'equals' in t) {
            return t.equals(tt._id)
          }

          return t === tt._id.toString()
        })
      )
      .filter(t => t)
  }))
}) as Resolver
