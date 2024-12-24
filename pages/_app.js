import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import '../styles/icons/style.css'

import { Router } from 'next/router'
import Head from 'next/head'

import { ToastContainer } from 'react-toastify'

import { ThemeProvider } from 'next-themes'

function MyApp ({ Component, pageProps }) {
  Router.events.on('routeChangeComplete', (url) => {
    try {
      window._hmt.push(['_trackPageview', url])
    } catch (e) {}
  })

  return (
    <>
      <Head></Head>
      <ThemeProvider enableSystem={false} defaultTheme='idol' attribute="data-theme" themes={['light', 'dark', 'flower', 'marvelous', 'brisk', 'idol']}>
        <Component {...pageProps} />
      </ThemeProvider>
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
