import {gql, useQuery} from "@apollo/client";
import {Link, useParams} from "react-router-dom";
import {Dish} from "../../components/dish";
import {DISH_FRAGMENT, RESTAURANT_FRAGMENT} from "../../fragment";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";
import {VictoryAxis, VictoryBar, VictoryChart, VictoryPie} from "victory";

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

interface IParams {
  id: string;
}

const chartData = [
  {x: 1, y: 3000},
  {x: 2, y: 1500},
  {x: 3, y: 1700},
  {x: 4, y: 2200},
  {x: 5, y: 1300},
  {x: 6, y: 2800},
  {x: 7, y: 3500},
];

export const MyRestaurant = () => {
  const {id} = useParams<keyof IParams>() as IParams;
  const {data} = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );
  return (
    <div>
      <div
        className="  bg-gray-700  py-28 bg-center bg-contain"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || "Loading..."}
        </h2>
        <Link
          to={`/restaurants/${id}/add-dish`}
          className=" mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Dish &rarr;
        </Link>
        <Link to={``} className=" text-white bg-lime-700 py-3 px-10">
          Buy Promotion &rarr;
        </Link>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please Add a dish!</h4>
          ) : (
            <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-8 pb-20">
              {data?.myRestaurant?.restaurant?.menu.map((dish) => (
                <Dish {...dish} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-3">
          <h4 className="text-center text-2xl font-medium">Sales</h4>
          <div className="max-w-lg w-full mx-auto">
            {/* <VictoryAxis
                tickFormat={(step) => `$${step / 1000}k`}
                dependentAxis
              />
              <VictoryAxis tickFormat={(step) => `Day ${step}`} />
              <VictoryBar data={chartData} /> */}
            <VictoryPie data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};
