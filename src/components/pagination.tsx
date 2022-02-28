import React from "react";

interface PaginationProps {
  totalPages: number | null | undefined;
}

export const Pagination: React.FC<PaginationProps> = ({totalPages}) => {
  const [page, setPage] = React.useState(1);
  const onNextPageClick = () => setPage(page + 1);
  const onPrevPageClick = () => setPage(page - 1);
  return (
    <div className="grid grid-cols-3 text-center max-w-md mx-auto">
      {page > 1 ? (
        <button
          onClick={onPrevPageClick}
          className="focus:outline-none font-medium text-xl"
        >
          &larr;
        </button>
      ) : (
        <div></div>
      )}
      <span className="mx-5">
        Page{page} of {totalPages}
      </span>
      {page !== totalPages && (
        <button
          onClick={onNextPageClick}
          className="focus:outline-none font-medium text-xl"
        >
          &rarr;
        </button>
      )}
    </div>
  );
};
