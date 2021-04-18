import App from "./App";
import { ApolloProvider } from "@apollo/react-hooks";
import {
    ApolloClient,
    InMemoryCache,
  } from '@apollo/client'



const client = new ApolloClient({
    uri:"http://localhost:5000",
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App></App>
    </ApolloProvider>
)