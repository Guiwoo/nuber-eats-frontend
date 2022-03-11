import {gql, useQuery} from "@apollo/client";
import {Link, useParams} from "react-router-dom";
import {Dish} from "../../components/dish";
import {
  DISH_FRAGMENT,
  OREDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "../../fragment";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import React from "react";

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
        orders {
          ...OrdersParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${OREDERS_FRAGMENT}
`;

interface IParams {
  id: string;
}

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
                <Dish key={dish.id} {...dish} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-3">
          <h4 className="text-center text-2xl font-medium">Sales</h4>
          <div className=" mx-auto">
            <VictoryChart
              theme={VictoryTheme.material}
              width={window.innerWidth}
              height={500}
              containerComponent={<VictoryVoronoiContainer />}
              domainPadding={50}
            >
              <VictoryLine
                labels={({datum}) => `$${datum.y}`}
                labelComponent={<VictoryTooltip style={{fontSize: 14}} />}
                style={{
                  data: {
                    strokeWidth: 5,
                  },
                }}
                interpolation="natural"
                data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                  x: order.createdAt,
                  y: order.total,
                }))}
              />
              <VictoryAxis dependentAxis />
              <VictoryAxis
                tickLabelComponent={<VictoryLabel renderInPortal />}
                style={{
                  tickLabels: {
                    fontSize: 14,
                    angle: 45,
                  },
                }}
                tickFormat={(day) => new Date(day).toLocaleDateString("ko")}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};
