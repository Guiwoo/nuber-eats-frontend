import {gql, useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";
import {CATEGORY_FRAMENT, RESTAURANT_FRAGMENT} from "../../fragment";
import {category, categoryVariables} from "../../__generated__/category";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${CATEGORY_FRAMENT}
  ${RESTAURANT_FRAGMENT}
`;

export const Category = () => {
  const {slug} = useParams();
  const {data, loading} = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: slug || "",
        },
      },
    }
  );
  console.log(data);
  return <h1>category</h1>;
};
