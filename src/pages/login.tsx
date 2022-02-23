import {gql, useMutation} from "@apollo/client";
import {useForm} from "react-hook-form";
import {FormError} from "../components/form-error";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import nuberLogo from "../images/logo.svg";
import {ButtonValidOrNot} from "../components/buttonValidOrNot";
import {Link} from "react-router-dom";

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

export const LoginPage = () => {
  const {
    register,
    getValues,
    formState: {errors, isDirty, isValid},
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });
  //this data i can handle !
  const onCompleted = (data: loginMutation) => {
    const {
      login: {ok, token},
    } = data;
    if (ok) {
      console.log(token);
    }
  };
  const [_loginMutation, {data: loginMutationResult, loading}] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const {email, password} = getValues();
      _loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className="px-5 w-full max-w-screen-sm flex flex-col items-center">
        <img src={nuberLogo} className="w-52 mb-5" alt="" />
        <h4 className="font-medium text-left w-full text-2xl mb-10">
          WELCOME BACK
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            {...register("email", {required: "Email is Required"})}
            placeholder="Email"
            type="email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("password", {
              required: "Password is Required",
              minLength: 2,
            })}
            placeholder="Password"
            type="password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars" />
          )}
          <ButtonValidOrNot
            canClick={isValid}
            loading={loading}
            actionText="Log In"
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Nuber ?{" "}
          <Link className="text-lime-600 hover:underline" to="/create-account">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
