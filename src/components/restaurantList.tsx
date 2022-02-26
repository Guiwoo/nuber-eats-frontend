interface iRestaurantProps {
  coverImage: string;
  name: string;
  categoryName?: string;
  id: string;
}

export const RestaurantList: React.FC<iRestaurantProps> = ({
  coverImage,
  name,
  categoryName,
  id,
}) => {
  return (
    <div>
      <div
        style={{backgroundImage: `url(${coverImage})`}}
        className="py-28 bg-cover bg-center mb-2"
      ></div>
      <h4 className="text-lg font-medium">{name}</h4>
      <div className=" border-t border-gray-400 mt-2 py-2 text-xs opacity-50 capitalize">
        {categoryName}
      </div>
    </div>
  );
};
