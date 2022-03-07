import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import {HelmetLayout} from "../../components/HelmetLayout";
import {RESTAURANT_FRAGMENT} from "../../fragment";
import {myRestaurants} from "../../__generated__/myRestaurants";
import Nuber from "../../images/topBar.png";

const MY_RESTAURANT_QUERY = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaruant = () => {
  const {data} = useQuery<myRestaurants>(MY_RESTAURANT_QUERY);
  return (
    <div>
      <HelmetLayout title="My Restaurant" />
      <div className="container">
        <div
          style={{backgroundImage: `url(${Nuber})`}}
          className="bg-cover bg-no-repeat bg-center w-full py-40 flex items-center justify-center mb-10"
        />
        <h2 className="text-4xl font-medium mb-10">My Restaurants</h2>
        {data?.myRestaurants.ok &&
          data?.myRestaurants?.restaurants?.length === 0 && (
            <>
              <h4 className="text-xl mb-5">You have no restaurants.</h4>
              <Link
                className="text-lime-600 hover:underline"
                to="/add-restaurant"
              >
                Create one &rarr;
              </Link>
            </>
          )}
      </div>
    </div>
  );
};
