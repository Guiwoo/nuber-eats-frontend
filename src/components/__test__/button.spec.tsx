import {render, screen} from "@testing-library/react";
import {ButtonValidOrNot} from "../buttonValidOrNot";

describe("<Button />", () => {
  it("Should render ok with props", () => {
    const {rerender} = render(
      <ButtonValidOrNot canClick={true} loading={false} actionText="hoit" />
    );
    screen.getByText("hoit");
    rerender(
      <ButtonValidOrNot canClick={false} loading={true} actionText="hoit" />
    );
    screen.getByText("Loading...");
  });
  it("Should display loading", () => {
    render(
      <ButtonValidOrNot canClick={false} loading={true} actionText="hoit" />
    );
    screen.getByText("Loading...");
    expect(screen.getByRole("button")).toHaveClass("pointer-events-none");
  });
});
