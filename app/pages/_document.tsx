import { colours, fonts } from '@/theme'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class extends Document {
  public static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  public render() {
    return (
      <html lang="en-US">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="robots" content="noindex" />

          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/normalize.css@8.0.0/normalize.min.css" />
          <link rel="stylesheet" href={fonts.family.src()} />

          {this.props.styleTags}

          <style>{`
          :root {
            --pad: calc(8px + (16 - 9) * (100vw - 400px) / 1700);
          }

          html {
            color: ${colours.base};
            font-family: ${fonts.family.copy};
            font-size: ${fonts.copy};
            line-height: 1.75;
          }

          h1,h2,h3 {
            font-family: ${fonts.family.title};
          }

          h5, h6 {
            text-transform: uppercase;
          }

          * {
            box-sizing: border-box;
          }

          ::selection {
            color: ${colours.brand.bg};
            background: ${colours.brand.colour};
          }

          *:focus {
            outline: 5px auto -webkit-focus-ring-color;
          }
          `}</style>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
