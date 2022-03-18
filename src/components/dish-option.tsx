interface IDishOptionProps {
  isSelected: boolean;
  name: string;
  extra?: number | null;
  dishId: number;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

export const DishOptionComponent: React.FC<IDishOptionProps> = ({
  isSelected,
  name,
  extra,
  addOptionToItem,
  dishId,
  removeOptionFromItem,
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOptionToItem(dishId, name);
    }
  };
  return (
    <span
      onClick={onClick}
      className={`flex items-center text-gray-500 ${
        isSelected ? "text-green-500" : ""
      }`}
    >
      <h6 className="mr-2">{name}</h6>
      {extra && <h6 className="text-sm opacity-75">${extra}</h6>}
    </span>
  );
};
