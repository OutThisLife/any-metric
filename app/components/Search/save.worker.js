self.addEventListener('message', ({ data: fields }) => {
  fields.operationName = 'getEbay'

  let i = 1
  const getPage = () => {
    fields.variables.paginationInput.pageNumber = i

    fetch(`${location.origin}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'same'
      },
      body: JSON.stringify(fields)
    })
      .catch(err => self.postMessage({ err }))
      .then(r => r.json())
      .then(({ data }) => {
        if ('recurse' in fields) {
          const pages = parseInt(data.ebay.total, 10) / 100

          if (pages > i) {
            self.postMessage({ tick: i })
            getPage(++i)
          } else {
            self.postMessage({ done: true })
          }
        } else {
          self.postMessage({ done: true, ...data })
        }
      })
  }

  getPage()
})
