import {BrowserRouter as Router, Outlet, Route, Routes} from "react-router-dom";
import {Restaurant} from "../pages/client/restaurant";
import {Header} from "../components/header";
import {useMe} from "../hooks/useMe";
import {NotFound} from "../pages/404";
import {ConfirmEmail} from "../pages/user/confirm-email";
import {EditProfile} from "../pages/user/edit-profile";

const ClientRotues = () => {
  return (
    <>
      <Restaurant />
      <Outlet />
    </>
  );
};

export const LoggedInRouter = () => {
  const {data, loading, error} = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className=" font-medium text-xl tracking-wide">Loading..</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Routes>
        {data.me.role === "Client" && (
          <Route path="/">
            <Route index element={<Restaurant />} />
            <Route path="confirm" element={<ConfirmEmail />} />
            <Route path="edit-profile" element={<EditProfile />} />
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
