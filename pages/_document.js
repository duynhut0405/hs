import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const isAmp = ctx.asPath.includes('/amp/');
    const isDistribution = ctx.asPath.includes('distribution');
    const query = ctx.asPath.substr(ctx.asPath.indexOf('?') + 1);
    let canonical = ctx.asPath;
    if (query == 'page=1') {
      canonical = ctx.asPath.replace('?page=1', '');
      return { ...initialProps, isAmp, isDistribution, canonical };
    } else if (query.includes('page=1&')) {
      canonical = ctx.asPath.replace('page=1&', '');
      return { ...initialProps, isAmp, isDistribution, canonical };
    }
    return { ...initialProps, isAmp, isDistribution, canonical };
  }

  render() {
    return (
      <Html lang='vi'>
        <Head>
          <script async src='https://www.googletagmanager.com/gtag/js?id=G-187YHKR14V'></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date()); gtag('config', 'G-187YHKR14V');`,
            }}
          ></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `(function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dataLayer', 'GTM-5RM3VMD')`,
            }}
          ></script>

          <link rel='manifest' href='/manifest.json' crossOrigin='use-credentials'></link>
          <link rel='preload' href='/fonts/icomoon/fonts/icomoon.ttf?f3mfje' as='font' crossOrigin='' />
          <link rel='preload' href='/mb/fonts/icomoon/fonts/icomoon.ttf?la70k9' as='font' crossOrigin='' />
          <meta name='robots' content='index, follow' />
          {this.props.canonical && <link rel='canonical' href={`https://hoasenhome.vn${this.props.canonical}`} />}
          {!this.props.isAmp ? (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-58ZZ54B');`,
              }}
            ></script>
          ) : (
            <script async custom-element='amp-analytics' src='https://cdn.ampproject.org/v0/amp-analytics-0.1.js'></script>
          )}
          {process?.env?.MODE == 'develop' && <meta name='robots' content='noindex, nofollow' />}
        </Head>
        <body>
          <noscript dangerouslySetInnerHTML={{ __html: `<iframe src='https://www.googletagmanager.com/ns.html?id=GTM-5RM3VMD' height='0' width='0' style='display:none;visibility:hidden'></iframe>` }}></noscript>
          {!this.props.isAmp ? (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-58ZZ54B"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            ></noscript>
          ) : (
            <amp-analytics config='https://www.googletagmanager.com/amp.json?id=GTM-T65QTJ3&gtm.url=SOURCE_URL' data-credentials='include'></amp-analytics>
          )}
          <Main />
          <NextScript />
        </body>
        {/* {!this.props.isAmp && <script async type="text/javascript" src="/js/script.js"></script>} */}
        {this.props.isDistribution && <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyD_oYQAea0Nrq4tA7JNpXpUH7GzxDySbfg&language=vi' type='text/javascript'></script>}
        {this.props.isDistribution && <script async type='text/javascript' src='/js/map.js'></script>}
        {this.props.isDistribution && <script src='https://www.gstatis.com/firebasejs/8.2.3/firebase-app.js'></script>}
        {this.props.isDistribution && <script src='https://www.gstatis.com/firebasejs/8.2.3/firebase-messaging.js'></script>}
      </Html>
    );
  }
}

export default MyDocument;
