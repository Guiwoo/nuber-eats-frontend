type BtnProps = {
  canClick: boolean;
  loading: boolean;
  actionText: string;
};

export const ButtonValidOrNot: React.FC<BtnProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  return (
    <button
      className={`text-lg font-medium focus:outline-none text-white py-3 transition-colors ${
        canClick
          ? "bg-lime-500 hover:bg-lime-700"
          : "bg-gray-300 pointer-events-none"
      }`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
};
