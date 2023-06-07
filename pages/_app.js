import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return <div className="container">
  <Head>
   <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
    <Component {...pageProps} />
  </div>
}
