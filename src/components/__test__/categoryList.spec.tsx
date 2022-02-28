import {render, screen} from "@testing-library/react";
import {CategoryList} from "../categoryList";

describe("<CategoryList />", () => {
  it("Should render okay", () => {
    const variables = {
      coverImage: "cover",
      name: "test",
      id: "1",
    };
    render(<CategoryList {...variables} />);
    screen.getByText(variables.name);
  });
});
