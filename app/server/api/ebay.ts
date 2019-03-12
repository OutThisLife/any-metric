require('dotenv').config()

const fetch = require('isomorphic-unfetch')

const { EBAY_APP_ID } = process.env

export const getCommerce = async (
  body: Response,
  op: EbayOperations = 'findItemsByKeywords'
): Promise<Response> => {
  try {
    const url = (() => {
      if (/^find|items$/i.test(op)) {
        return `https://svcs.ebay.com/services/search/FindingService/v1`
      }
    })()

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'X-EBAY-SOA-OPERATION-NAME': op,
        'X-EBAY-SOA-SECURITY-APPNAME': EBAY_APP_ID,
        'X-EBAY-SOA-REQUEST-DATA-FORMAT': 'JSON'
      }
    })

    const data = await res.json()

    if ('errorMessage' in data) {
      throw data.errorMessage[0].error[0]
    }

    return data[`${op}Response`][0]
  } catch (err) {
    console.log('')
    console.error('Ebay API error:')
    console.dir(err)
    console.trace(err)
    console.log('')
  }
}

export type EbayOperations = 'findItemsByKeywords' | 'findCompletedItems'

interface Response {
  [key: string]: any
}
