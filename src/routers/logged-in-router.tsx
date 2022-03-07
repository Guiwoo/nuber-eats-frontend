import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Restaurant} from "../pages/client/restaurant";
import {Header} from "../components/header";
import {useMe} from "../hooks/useMe";
import {NotFound} from "../pages/404";
import {ConfirmEmail} from "../pages/user/confirm-email";
import {EditProfile} from "../pages/user/edit-profile";
import {SearchPage} from "../pages/client/search";
import {Category} from "../pages/client/category";
import {RestaurantDetail} from "../pages/client/restaurantDetail";
import {MyRestaruants} from "../pages/owner/myRestaurants";
import {MyRestaurant} from "../pages/owner/myRestaurant";
import {AddRestaurant} from "../pages/owner/addRestaurant";

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
        <Route path="/">
          <Route path="confirm" element={<ConfirmEmail />} />
          <Route path="edit-profile" element={<EditProfile />} />
          {data.me.role === "Client" && (
            <>
              <Route index element={<Restaurant />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="category/:slug" element={<Category />} />
              <Route path="restaurants/:id" element={<RestaurantDetail />} />
            </>
          )}
          {data.me.role === "Owner" && (
            <>
              <Route index element={<MyRestaruants />} />
              <Route path="add-restaurant" element={<AddRestaurant />} />
              <Route path="restaurants/:id" element={<MyRestaurant />} />
            </>
          )}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
