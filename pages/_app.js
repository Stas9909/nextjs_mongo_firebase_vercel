import MainLayout from '@/components/layout/MainLayout'
import '@/styles/globals.css'
import Head from 'next/head'

import { Provider } from 'react-redux';
import store from '@/Redux/redux-store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Head>
          <title>NextJS useful events</title>
          <meta name="description" content="Here is a test project applying main functionality of Next js" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}
