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

          {this.props.styleTags}

          <style>{`
          :root {
            --text: #FFF;
            --primary: #fd0037;
            --faded: #404763;
            --bg: #04070e;

            --grid: 9.1px;
          }

          html, body {
            margin: 0;
            padding: 0;
          }

          html {
            color: var(--text);
            font: 13px/1.42857142857143 var(--font);
            font-smoothing: antialiased;
            letter-spacing: -.005em;
            text-decoration-skip: ink;
            background: fixed url(https://www.toptal.com/designers/subtlepatterns/patterns/ep_naturalblack.png);
          }

          body {
            cursor: crosshair;
            min-height: 100vh;
            background: rgba(4, 7, 14, .9);
          }

          * {
            box-sizing: border-box;
            transition: .2s ease-in-out;
          }

          *:focus {
            outline: none;
          }

          img, figure, embed, iframe, video, audio {
            max-width: 100%;
            height: auto;
            margin: 0;
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
