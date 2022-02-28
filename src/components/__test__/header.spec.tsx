import {MockedProvider} from "@apollo/client/testing";
import {render, waitFor, screen} from "@testing-library/react";
import {Header} from "../header";
import {BrowserRouter as Router} from "react-router-dom";
import {ME_QUERY} from "../../hooks/useMe";

describe("<Header />", () => {
  it("renders verify banner", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: ME_QUERY,
            },
            result: {
              data: {
                me: {
                  id: 1,
                  email: "",
                  role: "",
                  verified: false,
                },
              },
            },
          },
        ]}
      >
        <Router>
          <Header />
        </Router>
      </MockedProvider>
    );
    await waitFor(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    screen.getByText("Please Verify your email");
  });
  it("renders with out verify banner", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: ME_QUERY,
            },
            result: {
              data: {
                me: {
                  id: 1,
                  email: "",
                  role: "",
                  verified: true,
                },
              },
            },
          },
        ]}
      >
        <Router>
          <Header />
        </Router>
      </MockedProvider>
    );
    await waitFor(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(screen.queryByText("Please Verify your email")).toBeNull();
  });
});
