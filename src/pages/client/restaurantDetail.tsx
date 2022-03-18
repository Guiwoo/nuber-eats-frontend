import {gql, useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";
import {DISH_FRAGMENT, RESTAURANT_FRAGMENT} from "../../fragment";

import {Dish} from "../../components/dish";
import {restaurant, restaurantVariables} from "../../__generated__/restaurant";
import {useState} from "react";
import {CreateOrderItemInput} from "../../__generated__/globalTypes";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IResProps {
  id: string;
}

export const RestaurantDetail = () => {
  const {id} = useParams<keyof IResProps>() as IResProps;
  const {data} = useQuery<restaurant, restaurantVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +id,
      },
    },
  });
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };
  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };
  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{dishId, options: []}, ...current]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((dish) => dish.dishId !== dishId)
    );
  };
  const addOptionToItem = (dishId: number, option: any) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems((current) => [
        {dishId, options: [option, ...oldItem.options!]},
        ...current,
      ]);
    }
  };
  console.log(orderItems);
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

      <div className="container flex flex-col items-end">
        <button onClick={triggerStartOrder} className="btn px-2">
          {orderStarted ? "Ordering" : "Start Order"}
        </button>
        <div className="w-full grid md:grid-cols-3 gap-x-5 gap-y-10 mt-8 pb-20">
          {data?.restaurant?.restaurant?.menu.map((dish) => (
            <Dish
              isSelected={isSelected(dish.id)}
              removeFromOrder={removeFromOrder}
              key={dish.id}
              {...dish}
              isCustomer={true}
              orderStarted={orderStarted}
              addItemToOrder={addItemToOrder}
              addOptionToItem={addOptionToItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
