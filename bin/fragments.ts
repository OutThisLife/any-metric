import 'isomorphic-unfetch'

import { writeFile } from 'fs'
import * as path from 'path'

const filePath = path.resolve(__dirname, '../app/static', 'fragmentTypes.json')

const init = async () => {
  try {
    const res = await (await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variables: {},
        query: `
          {
            __schema {
              types {
                kind
                name
                possibleTypes {
                  name
                }
              }
            }
          }
        `
      })
    })).json()

    writeFile(filePath, JSON.stringify(res.data), err => {
      if (err) {
        throw err
      } else {
        console.log('Wrote to', filePath)
      }
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

init()
