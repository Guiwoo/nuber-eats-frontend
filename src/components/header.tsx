import {useMe} from "../hooks/useMe";
import nuberLogo from "../images/logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export const Header = () => {
  const {data} = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-400 py-3 px-3 text-center text-xs text-white">
          <span>Please Verify your email</span>
        </div>
      )}
      <header className="py-4 fixed bg-white w-full">
        <div className="w-full px-5 xl:px-0 max-w-screen-lg mx-auto flex justify-between">
          <Link to="/">
            <img src={nuberLogo} className="w-24" alt="" />
          </Link>
          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-lg" />
            </Link>
          </span>
        </div>
      </header>
      <div className="py-6"></div>
    </>
  );
};
