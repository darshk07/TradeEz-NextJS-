import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import Spline from '@splinetool/react-spline';


export default function App({ Component, pageProps }) {
  return <div className="">
    <Component {...pageProps} />
    <div className="animation">
      <Spline scene="https://prod.spline.design/hpKhV6EU-n8oGsHz/scene.splinecode" />
    </div>
  </div>
}
