import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {Restaurant} from "../pages/client/restaurant";
import {Header} from "../components/header";
import {useMe} from "../hooks/useMe";

const ClientRotues = () => {
  return <Restaurant />;
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
          <Route path="/" element={<ClientRotues />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
