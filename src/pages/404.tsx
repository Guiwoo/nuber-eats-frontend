import {Link} from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex items-center h-screen justify-center flex-col">
      <h2 className="font-semibold text-2xl mb-3">Page Not Found.</h2>
      <h4 className="font-medium text-lg mb-5">
        The page you're looking for does not exist
      </h4>
      <Link className=" hover:underline text-lime-600" to="/">
        Go Back Home &rarr;
      </Link>
    </div>
  );
};
