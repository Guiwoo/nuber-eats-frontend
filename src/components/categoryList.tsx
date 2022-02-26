interface ICategoryProps {
  coverImage: string;
  name: string;
  id: string;
}

export const CategoryList: React.FC<ICategoryProps> = ({
  id,
  coverImage,
  name,
}) => {
  return (
    <div className="group flex flex-col items-center">
      <div
        className="group-hover:border-red-300 border w-16 h-16 bg-cover bg-center rounded-full"
        style={{backgroundImage: `url(${coverImage})`}}
      ></div>
      <span className="group capitalize mt-3 text-sm text-center font-medium">
        {name}
      </span>
    </div>
  );
};
