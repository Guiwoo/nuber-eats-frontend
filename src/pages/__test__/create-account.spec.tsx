import {ApolloProvider} from "@apollo/client";
import {waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {createMockClient} from "mock-apollo-client";
import {render, screen} from "../../test-utils";
import {UserRole} from "../../__generated__/globalTypes";
import {CreateAccountPage, Create_ACCOUNT_MUTATION} from "../create-account";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useNavigate: () => mockPush,
  };
});

describe("<Create Account Page/>", () => {
  const mockedClient = createMockClient();
  const setup = () =>
    render(
      <ApolloProvider client={mockedClient}>
        <CreateAccountPage />
      </ApolloProvider>
    );

  it("should render ok", async () => {
    setup();
    await waitFor(() =>
      expect(document.title).toBe("Create Account | Nuber Eats")
    );
  });

  it("should render validation error", async () => {
    setup();
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const btn = screen.getByRole("button");
    await waitFor(() => [userEvent.type(email, "won't work")]);
    expect(screen.getByRole("alert")).toHaveTextContent(
      /Write a right email form/i
    );
    await waitFor(() => [userEvent.clear(email)]);
    expect(screen.getByRole("alert")).toHaveTextContent(/Email is Required/i);

    await waitFor(() => [
      userEvent.type(email, "test@test.com"),
      userEvent.click(btn),
    ]);
    expect(screen.getByRole("alert")).toHaveTextContent(
      /Password is Required/i
    );
  });

  it("submits mutation with form values", async () => {
    setup();
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const btn = screen.getByRole("button");
    const formData = {
      email: "test@test.com",
      password: "123",
      role: UserRole.Client,
    };
    const mockedLoginMuataionResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: "mutation-error",
        },
      },
    });
    mockedClient.setRequestHandler(
      Create_ACCOUNT_MUTATION,
      mockedLoginMuataionResponse
    );
    jest.spyOn(window, "alert").mockImplementation(() => null);
    await waitFor(() => [
      userEvent.type(email, formData.email),
      userEvent.type(password, formData.password),
      userEvent.click(btn),
    ]);
    expect(mockedLoginMuataionResponse).toHaveBeenCalledTimes(1);
    expect(mockedLoginMuataionResponse).toHaveBeenCalledWith({
      createAccInput: {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      },
    });
    expect(window.alert).toHaveBeenCalledWith("Account Created");
    expect(mockPush).toHaveBeenCalledWith("/", {
      replace: true,
      state: {email: "test@test.com", password: "123"},
    });
    expect(screen.getByRole("alert")).toHaveTextContent("mutation-error");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
