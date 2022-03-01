import {ApolloProvider} from "@apollo/client";
import {render, waitFor, screen} from "@testing-library/react";
import {createMockClient, MockApolloClient} from "mock-apollo-client";
import {LoginPage, LOGIN_MUTATION} from "../login";
import {BrowserRouter as Router} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import userEvent from "@testing-library/user-event";

describe("<Login Page/>", () => {
  const mockedClient = createMockClient();
  const setup = (client: MockApolloClient) =>
    render(
      <HelmetProvider>
        <ApolloProvider client={client}>
          <Router>
            <LoginPage />
          </Router>
        </ApolloProvider>
      </HelmetProvider>
    );
  it("should render ok with title", async () => {
    setup(mockedClient);
    await waitFor(() => {
      expect(document.title).toBe("Log-in | Nuber Eats");
    });
  });

  it("display email validation error", async () => {
    setup(mockedClient);
    const email = screen.getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, "this@won't work holeymoly.com");
      expect(screen.getByRole("alert")).toHaveTextContent(
        /please write a right email form/i
      );
      userEvent.clear(email);
    });
    expect(screen.getByRole("alert")).toHaveTextContent(/Email is Required/i);
  });

  it("displya password Require error", async () => {
    setup(mockedClient);
    const email = screen.getByPlaceholderText(/email/i);
    const btn = screen.getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "test@test.com");
      userEvent.click(btn);
    });
    expect(screen.getByRole("alert")).toHaveTextContent(
      /Password is Required/i
    );
  });

  it("submits form and calls mutation", async () => {
    const {debug} = setup(mockedClient);
    const formData = {
      email: "test@test.com",
      password: "123",
    };
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "xxx",
          error: "mutation error",
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, "setItem");
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(screen.getByRole("button"));
    });
    expect(mockedMutationResponse).toHaveBeenCalled();
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
    expect(screen.getByRole("alert")).toHaveTextContent(/mutation error/i);
    expect(localStorage.setItem).toHaveBeenCalledWith("nuber-token", "xxx");
  });
});
