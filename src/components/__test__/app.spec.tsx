import {render, screen, waitFor} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import {isLoggedInVar} from "../../apollo";
import {App} from "../app";

jest.mock("../../routers/logged-out-router", () => {
  return {
    LoggedOutRouter: () => <span>Logged Out</span>,
  };
});

jest.mock("../../routers/logged-in-router", () => {
  return {
    LoggedInRouter: () => <span>Logged in</span>,
  };
});

describe("<App />", () => {
  it("renders LoggedOutRouter", () => {
    const {getByText} = render(<App />);
    screen.getByText("Logged Out");
  });
  it("renders Logged In", async () => {
    const {getByText, debug} = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    screen.getByText("Logged in");
  });
});
