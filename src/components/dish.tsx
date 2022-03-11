interface IDishProps {
  description: string;
  name: string;
  price: number;
}

export const Dish: React.FC<IDishProps> = ({name, description, price}) => {
  return (
    <div className="pt-3 pb-6 px-8 border hover:border-gray-800 transition-all">
      <div className="mb-3">
        <h3 className="text-lg font-medium">{name}</h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>$ {price}</span>
    </div>
  );
};
