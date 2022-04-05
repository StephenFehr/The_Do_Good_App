import { gql, useQuery } from "@apollo/client";
import { Banner } from "@shopify/polaris";
import { Loading } from "@shopify/app-bridge-react";


// GraphQL query to retrieve products by IDs.
// The price field belongs to the variants object because
// product variants can have different prices.
const GET_ORDER = gql`
query getProducts {
  orders(first:100){
    edges{
      node{
        id
        displayFulfillmentStatus
        processedAt
      }
    }
  }
}
`;

export function GetOrders() {
  const { loading, error, data } = useQuery(GET_ORDER, {
    
  });
  if (loading) return <Loading />;

  if (error) {
    console.warn(error);
    return (
      <Banner status="critical">There was an issue loading products.</Banner>
    );
  }

  const object = data.orders.edges
  let numOfNodes = object.length
  console.log(numOfNodes)
  return (
     numOfNodes
  );
}
