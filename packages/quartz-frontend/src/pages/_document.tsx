import NextDocument, {
  DocumentProps,
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

class MyDocument extends NextDocument<DocumentProps> {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body className='text-white bg-zinc-900 font-body'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  static async getInitialProps(context: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(context);

    return { ...initialProps };
  }
}

export default MyDocument;
