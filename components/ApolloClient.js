import fetch from "node-fetch";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import clientConfig from "../client-config";

import { IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import introspectionQueryResultData from "../fragmentTypes.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData: {
//     __schema: {
//       types: [
//         {
//           kind: "INTERFACE",
//           name: "Document",
//           possibleTypes: [{ name: "MyInterface1" }, { name: "SomeInterface2" }],
//         },
//       ],
//     },
//   },
// });

const client = new ApolloClient({
  link: createHttpLink({
    uri: clientConfig.graphqlUrl,
    fetch: fetch,
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
});

export default client;
