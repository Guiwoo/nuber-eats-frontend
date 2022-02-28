import {render, screen} from "@testing-library/react";
import React from "react";
import {Pagination} from "../pagination";

describe("<Pagination />", () => {
  it("render ok page 1", () => {
    render(<Pagination totalPages={2} />);
    expect(screen.getByRole("button")).toHaveClass("focus:outline-none");
  });

  it("render page 1", () => {
    const my = 2;
    const setPage = jest.fn();
    React.useState = jest.fn().mockReturnValue([my, setPage]);
    render(<Pagination totalPages={3} />);
    screen.getByText("→");
  });

  it("should been called btn", () => {
    const my = 2;
    const setPage = jest.fn();
    React.useState = jest.fn().mockReturnValue([my, setPage]);
    render(<Pagination totalPages={3} />);
    let btn = screen.getAllByRole("button")[0] as HTMLButtonElement;
    btn.click();
    expect(setPage).toBeCalled();
  });

  it("click next btn", () => {
    const my = 1;
    const setPage = jest.fn();
    React.useState = jest.fn().mockReturnValue([my, setPage]);

    render(<Pagination totalPages={3} />);
    screen.getByRole("button").click();
    expect(setPage).toBeCalled();
  });
});
