import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NotFound} from "../pages/404";
import {CreateAccountPage} from "../pages/create-account";
import {LoginPage} from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/create-account" element={<CreateAccountPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};
