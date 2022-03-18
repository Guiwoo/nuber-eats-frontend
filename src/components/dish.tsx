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
  addOptionToItem?: (dishId: number, option: any) => void;
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
  addOptionToItem,
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
            <button onClick={onClick}>{isSelected ? "Remove" : "Add"}</button>
          )}
        </h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>$ {price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="my-3 font-medium text-gray-500">Dish Options :</h5>
          {options?.map((option) => (
            <span
              onClick={() =>
                addOptionToItem
                  ? addOptionToItem(id, {
                      name: option.name,
                      extra: option.extra,
                    })
                  : null
              }
              className="flex items-center text-gray-500"
              key={option.name}
            >
              <h6 className="mr-2">{option.name}</h6>
              <h6 className="text-sm opacity-75">${option.extra}</h6>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
