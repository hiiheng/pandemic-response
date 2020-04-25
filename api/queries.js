import gql from 'graphql-tag';

const QUERIES = {
  ALL_ASKS: gql`
    query {
      asks {
        id
        comments
        quantity
        userProfile {
          name
          id
        }
        status
      }
    }
  `,
  ALL_GIVES: gql`
    query {
      gives {
        id
        comments
        quantity
        userProfile {
          name
          id
        }
        status
      }
    }
  `,
};

export default QUERIES;
