import { gql, useQuery } from "@apollo/client";
import { Banner } from "@shopify/polaris";
import { Loading } from "@shopify/app-bridge-react";


// GraphQL query to retrieve orders between the first and 
// last of the month 
const GET_ORDER = gql`
query getOrders ($querySting: String!){
  orders(first:10 query: $querySting){
    edges{
      node{
        id
      }   
    }
  }
}
`;

//Exported function brings in an array of date strings. Used by giving the function call 
// lastOfMonth and firstOfMonth (from GetMonthDate.jsx) as parameters. 
export function GetOrders(dateRange) {

  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: {querySting: "processed_at:>"+ dateRange.first + " AND processed_at:<" + dateRange.last + "AND fulfillment_status:Fulfilled OR fulfillment_status:Partially fulfilled"  
               }
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
  console.log("dateRange.first: " + dateRange.first + " dateRange.last: " + dateRange.last)
  return (
     numOfNodes
  );
}
