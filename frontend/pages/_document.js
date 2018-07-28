import * as React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import getConfig from 'next/config'
import 'isomorphic-unfetch'

export default class extends Document {
  static async getInitialProps(...args) {
    const d = Document
    const documentProps = await d.getInitialProps(...args)
    const { renderPage } = args[0]
    const page = renderPage()
    return { ...documentProps, ...page }
  }

  render() {
    const { user } = this.props
    return (
      <html lang="ko">
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
          />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:site_name" content={getConfig().publicRuntimeConfig.SITE_NAME} />
          <meta property="og:title" content={getConfig().publicRuntimeConfig.SITE_TITLE} />
          <meta property="og:description" content={getConfig().publicRuntimeConfig.SITE_DESCRIPTION} />
          <meta property="og:image" content={getConfig().publicRuntimeConfig.SITE_IMAGE} />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:site" content={getConfig().publicRuntimeConfig.SITE_NAME} />
          <meta property="twitter:title" content={getConfig().publicRuntimeConfig.SITE_TITLE} />
          <meta property="twitter:description" content={getConfig().publicRuntimeConfig.SITE_DESCRIPTION} />
          <meta property="twitter:image" content={getConfig().publicRuntimeConfig.SITE_IMAGE} />
          <meta name="format-detection" content="telephone=no, address=no, email=no"/>
          <link
            href="/static/fontawesome/css/all.css"
            rel="stylesheet"
          />
          <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/earlyaccess/notosanskr.css"
            rel="stylesheet"
          />
          <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
          <link rel='stylesheet' type='text/css' href='/static/rc-slider.css' />
          <link rel='stylesheet' type='text/css' href='/static/react-toastify.css' />
          <link rel="shortcut icon" href={getConfig().publicRuntimeConfig.FAVICON_URL} />
          <script type="text/javascript" src="//wcs.naver.net/wcslog.js"></script>
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.find,Array.prototype.includes,String.prototype.includes,Array.prototype.findIndex,Object.entries"></script>
          { getConfig().publicRuntimeConfig.KAKAO_JAVASCRIPT_KEY && <script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${getConfig().publicRuntimeConfig.KAKAO_JAVASCRIPT_KEY}&libraries=clusterer`}></script> }
          { getConfig().publicRuntimeConfig.GA_TRACKING_ID &&
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${getConfig().publicRuntimeConfig.GA_TRACKING_ID}`}
          />
          }
          { getConfig().publicRuntimeConfig.GA_TRACKING_ID &&
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${getConfig().publicRuntimeConfig.GA_TRACKING_ID}');
              ${user && `gtag('set', {'user_id': '${user.email}'});`}
              `
            }}
          />
          }
          { <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script> }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
