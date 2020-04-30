import gql from 'graphql-tag';

const VariableGives = gql`
  query GivesConnection($status: GiveStatusEnum, $orderBy: GiveOrderByInput) {
    givesConnection(where: {status: $status}, orderBy: $orderBy) {
      edges {
        node {
          comments
          createdAt
          id
          image
          itemCategory
          pickupLocation {
            address
            latitude
            longitude
          }
          status
          transportMethod
          quantity
          userProfile {
            id
            name
          }
        }
      }
    }
  }
`;

const VariableAsks = gql`
  query AsksConnection($status: AskStatusEnum, $orderBy: AskOrderByInput) {
    asksConnection(where: {status: $status}, orderBy: $orderBy) {
      edges {
        node {
          comments
          createdAt
          id
          itemCategory
          status
          transportMethod
          quantity
          userProfile {
            id
            name
          }
        }
      }
    }
  }
`;

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
  ONE_GIVE: gql`
    query give($id: ID!) {
      give(where: {id: $id}) {
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
  ONE_ASK: gql`
    query ask($id: ID!) {
      ask(where: {id: $id}) {
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
  VariableGives,
  VariableAsks,
};

export default QUERIES;
