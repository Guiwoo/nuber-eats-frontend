import {restaurant_restaurant_restaurant_menu_options} from "../__generated__/restaurant";

interface IDishProps {
  description: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  orderStarted?: boolean;
  id: number;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
  addItemToOrder?: (dishId: number) => void;
  isSelected?: boolean;
  removeFromOrder?: (dishId: number) => void;
}

export const Dish: React.FC<IDishProps> = ({
  name,
  description,
  price,
  isCustomer = false,
  options,
  id = 0,
  orderStarted = false,
  addItemToOrder,
  isSelected = false,
  removeFromOrder,
  children: dishOptions,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };
  return (
    <div
      className={`${
        isSelected ? "border-gray-800" : "hover:border-gray-800"
      } pt-3 pb-6 px-8 border transition-all cursor-pointer`}
    >
      <div className="mb-3">
        <h3 className="text-lg font-medium">
          {name}
          {orderStarted && (
            <button
              className={`btn py-1 mx-3 px-1 rounded-md ${
                isSelected ? "bg-red-500 hover:bg-red-800" : "null"
              }`}
              onClick={onClick}
            >
              {isSelected ? "Remove" : "Add"}
            </button>
          )}
        </h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>$ {price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="my-3 font-medium text-gray-500">Dish Options :</h5>
          {dishOptions}
        </div>
      )}
    </div>
  );
};
