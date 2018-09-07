import fetch from 'isomorphic-unfetch'

interface Item {
  id: string | number
  date: Date
}

export default ({ url, selectors }: { url: string; selectors: any }, done: (a: Item[]) => void) => {
  selectors.name = 'title'

  return fetch('/crawl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url, selectors })
  })
    .then(res => res.json())
    .then(({ items }) =>
      done(
        items.map(item => {
          item.id = Math.random()
          item.date = new Date().toISOString()

          return item
        })
      )
    )
}
