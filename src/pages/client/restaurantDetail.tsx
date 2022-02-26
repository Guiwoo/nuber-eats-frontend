import {gql, useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";
import {RESTAURANT_FRAGMENT} from "../../fragment";
import {restaurant, restaurantVariables} from "../../__generated__/restaurant";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
interface IResProps {
  id: string;
}

export const RestaurantDetail = () => {
  const {id} = useParams<keyof IResProps>() as IResProps;
  const {loading, data} = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +id,
        },
      },
    }
  );
  return (
    <div>
      <div
        className="bg-gray-800 bg-cover bg-no-repeat bg-center py-48"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImage})`,
        }}
      >
        <div className="bg-white w-4/12 py-8 pl-40">
          <h4 className="text-2xl mb-2">{data?.restaurant.restaurant?.name}</h4>
          <h5 className=" capitalize text-sm font-light">
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h6 className="text-sm font-light">
            {data?.restaurant.restaurant?.address}
          </h6>
        </div>
      </div>
    </div>
  );
};
