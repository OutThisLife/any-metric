self.addEventListener('message', ({ data: fields }) => {
  const endYear = new Date().getFullYear() - 10

  let i = 1
  let y = new Date().getFullYear()
  let t = 0

  if (fields.recurse) {
    fields.variables.itemFilter.push({
      name: 'StartTimeTo',
      value: `${y}-12-30T24:59:59.000Z`
    })
  }

  const getPage = () => {
    fields.variables.paginationInput.pageNumber = i

    fetch(`${location.origin}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'same'
      },
      body: JSON.stringify(
        Object.assign({}, fields, {
          operationName: 'getEbay'
        })
      )
    })
      .catch(err => self.postMessage({ err }))
      .then(r => r.json())
      .then(({ data }) => {
        const total = parseInt(data.ebay.total, 10)
        const totalPages = parseInt(data.ebay.totalPages, 10)
        const totalEntries = parseInt(data.ebay.totalEntries, 10)

        if (total > 0 && fields.recurse) {
          if (totalPages > i) {
            t = totalEntries
            ++i

            getPage()
          } else if (y > endYear) {
            fields.variables.itemFilter.find(i =>
              /starttime/i.test(i.name)
            ).value = `${--y}-12-30T24:59:59.000Z`

            i = 1
            t += totalEntries

            getPage()
          }

          self.postMessage({ i, total, totalEntries: t })
        } else {
          self.postMessage({ i, done: true, ...data })
        }
      })
  }

  getPage()
})
