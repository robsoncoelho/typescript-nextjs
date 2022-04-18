import { ApolloProvider } from '@apollo/client'
import React from 'react'
import 'src/styles/global.css'

import { useApollo } from 'src/graphql/apolloClient'


const App = ({ Component, pageProps }) => {
  const client = useApollo(pageProps)

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
