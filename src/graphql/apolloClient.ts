/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'http'
import type { AppProps } from 'next/app'
import { useMemo } from 'react'


export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

export type ResolverContext = {
  req?: IncomingMessage
  res?: ServerResponse
}

const authLink = setContext((_, { headers }): IncomingHttpHeaders => {
  return {
    headers: {
      ...headers,
    },
  }
})

const link = from([
  authLink,
  new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    credentials: 'same-origin',
  }),
])

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache: new InMemoryCache(),
  })
}

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps'],
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function initializeApollo(initialState: NormalizedCacheObject | null) {
  const APOLLO_CLIENT = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    APOLLO_CLIENT.cache.restore(initialState)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return APOLLO_CLIENT
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = APOLLO_CLIENT

  return APOLLO_CLIENT
}

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state],
  )

  return store
}
