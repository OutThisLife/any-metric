import fetch from 'isomorphic-fetch'

export default ({ url, selectors }, done) => {
  selectors.name = 'title'

  return fetch('//localhost:3000/crawl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url, selectors })
  }).then(res => res.json()).then(({ items }) => {
    return done(items.map(item => {
      item.id = Math.random()
      item.date = new Date().toISOString()

      return item
    }))
  })
}
