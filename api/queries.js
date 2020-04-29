import gql from 'graphql-tag';

const QUERIES = {
  ALL_ASKS: gql`
    query {
      asks {
        comments
        createdAt
        id
        itemCategory
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
        comments
        createdAt
        id
        itemCategory
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
