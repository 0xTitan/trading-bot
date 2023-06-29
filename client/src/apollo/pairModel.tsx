import { useQuery, gql } from '@apollo/client';
const pairModel = gql`
  query {
    pairs {
      id
      contract
      reserve0
      reserve1
      price
      timestamp
      synced
      tx
    }
  }
`;

export default pairModel;