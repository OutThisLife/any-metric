import fetch from 'isomorphic-fetch'

export default ({ url, selectors }, done) => {
  return fetch('//localhost:3000/crawl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url, selectors })
  }).then(res => res.text()).then(body => {
    console.log(body)
  })
}
