// import ApolloClient, {InMemoryCache} from 'apollo-boost';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createUploadLink} from 'apollo-upload-client';
import env from '../../env';

export const client = new ApolloClient({
  link: createUploadLink({
    uri: env.gqlApi,
  }),
  cache: new InMemoryCache(),
});
