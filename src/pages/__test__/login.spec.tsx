import {ApolloProvider} from "@apollo/client";
import {render, waitFor, screen} from "@testing-library/react";
import {createMockClient} from "mock-apollo-client";
import {LoginPage} from "../login";
import {BrowserRouter as Router} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import userEvent from "@testing-library/user-event";

describe("<Login Page/>", () => {
  const mockedClient = createMockClient();
  const setup = () =>
    render(
      <HelmetProvider>
        <ApolloProvider client={mockedClient}>
          <Router>
            <LoginPage />
          </Router>
        </ApolloProvider>
      </HelmetProvider>
    );
  it("should render ok with title", async () => {
    setup();
    await waitFor(() => {
      expect(document.title).toBe("Log-in | Nuber Eats");
    });
  });
  it("display email validation error", async () => {
    const {debug} = setup();
    const email = screen.getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, "this@won't work holeymoly.com");
      let errormessage = screen.getByRole("alert");
      expect(errormessage).toHaveTextContent(
        /please write a right email form/i
      );
      userEvent.clear(email);
    });
    debug();
  });
});
