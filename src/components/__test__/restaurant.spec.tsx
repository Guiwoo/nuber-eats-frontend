import {render, screen} from "@testing-library/react";
import {RestaurantList} from "../restaurantList";
import {BrowserRouter as Router} from "react-router-dom";

describe("<RestaurantList />", () => {
  it("renders ok with props", () => {
    const restaurantProps = {
      id: "1",
      name: "nameTest",
      categoryName: "catTest",
      coverImage: "lala",
    };
    render(
      <Router>
        <RestaurantList {...restaurantProps} />
      </Router>
    );
    screen.getByText(restaurantProps.name);
    screen.getByText(restaurantProps.categoryName);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/restaurants/1");
  });
});
