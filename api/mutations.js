import gql from 'graphql-tag';

const MUTATIONS = {
  CREATE_GIVE: gql`
    mutation newGive(
      $comments: String
      $itemCategory: ItemCategoryEnum
      $id: ID!
      $quantity: Int
    ) {
      createGive(
        data: {
          comments: $comments
          itemCategory: $itemCategory
          quantity: $quantity
          userProfile: {connect: {id: $id}}
        }
      ) {
        id
      }
    }
  `,
  CREATE_ASK: gql`
    mutation newAsk(
      $comments: String
      $itemCategory: ItemCategoryEnum
      $id: ID!
      $quantity: Int
    ) {
      createAsk(
        data: {
          comments: $comments
          itemCategory: $itemCategory
          quantity: $quantity
          userProfile: {connect: {id: $id}}
        }
      ) {
        id
      }
    }
  `,
};

export default MUTATIONS;
