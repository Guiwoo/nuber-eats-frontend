import {gql, useLazyQuery} from "@apollo/client";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {RESTAURANT_FRAGMENT} from "../../fragment";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [queryFetch, {loading, called, data}] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    const [_, query] = location.search.split("=");
    if (!query) {
      return navigate("/");
    }
    queryFetch({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, []);
  console.log(loading, data, called);
  return <div>Search</div>;
};
