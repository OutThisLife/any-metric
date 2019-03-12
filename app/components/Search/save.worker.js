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
        if (fields.recurse) {
          const total = parseInt(data.ebay.total, 10)
          const totalPages = parseInt(data.ebay.totalPages, 10)
          const totalEntries = parseInt(data.ebay.totalEntries, 10)

          if (totalPages > i) {
            getPage(++i)
            self.postMessage({ i, total, totalEntries })
          } else {
            self.postMessage({ i, done: true })
          }
        } else {
          self.postMessage({ i, done: true, ...data })
        }
      })
  }

  getPage()
})
