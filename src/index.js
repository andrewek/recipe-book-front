import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter
} from "react-router-dom";
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider
} from '@apollo/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache({resultCaching: false}),
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  options: { fetchPolicy: 'network-only' },
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);