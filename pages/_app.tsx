import 'styles/scss/global.scss'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider} from 'react-redux'
import store from '@/app/redux/store'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ReduxProvider>
  )
}
