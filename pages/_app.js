import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import '../styles/table_tmp.css'
import '../styles/icons/style.css'

import { Router } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import { ToastContainer } from 'react-toastify'

function MyApp ({ Component, pageProps }) {
  Router.events.on('routeChangeComplete', (url) => {
    try {
      window._hmt.push(['_trackPageview', url])
    } catch (e) {}
  })

  return (
    <>
      <Head>
      </Head>
      <Component {...pageProps} />
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </>
  )
}

export default MyApp
