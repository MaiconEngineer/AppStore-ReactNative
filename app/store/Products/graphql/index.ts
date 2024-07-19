import { gql } from "@apollo/client"

export const FETCH_PRODUCTS_LIST = gql`
   query FetchProductsList{
       products {
          id,
          title,
          uri,
          category,
          price,
          quantity
       }
   }
`
