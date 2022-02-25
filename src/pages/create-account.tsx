import {gql, useMutation} from "@apollo/client";
import {useForm} from "react-hook-form";
import {FormError} from "../components/form-error";
import nuberLogo from "../images/logo.svg";
import {ButtonValidOrNot} from "../components/buttonValidOrNot";
import {Link, useNavigate} from "react-router-dom";
import {UserRole} from "../__generated__/globalTypes";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import {EmailPattern} from "../constant";
import {HelmetLayout} from "../components/HelmetLayout";

interface IAccForm {
  email: string;
  password: string;
  role: UserRole;
}

const Create_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccInput: CreateAccInput!) {
    createAccount(input: $createAccInput) {
      ok
      error
    }
  }
`;

export const CreateAccountPage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    getValues,
  } = useForm<IAccForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const onCompleted = (data: createAccountMutation) => {
    const {email, password} = getValues();
    const {
      createAccount: {ok},
    } = data;
    if (ok) {
      navigate("/", {replace: true, state: {email, password}});
    }
  };
  const [_createAccMutation, {loading, data: createAccountResult}] =
    useMutation<createAccountMutation, createAccountMutationVariables>(
      Create_ACCOUNT_MUTATION,
      {onCompleted}
    );

  const onSubmit = () => {
    if (!loading) {
      const {email, password, role} = getValues();
      _createAccMutation({
        variables: {
          createAccInput: {
            email,
            password,
            role,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <HelmetLayout title="Create Account" />
      <div className="px-5 w-full max-w-screen-sm flex flex-col items-center">
        <img src={nuberLogo} className="w-52 mb-5" alt="" />
        <h4 className="font-medium text-left w-full text-2xl mb-10">
          LET'S GET STARTED
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value: EmailPattern,
                message: "Write a email form",
              },
            })}
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
          <label className="text-sm font-medium text-gray-400">
            Check a Role
          </label>
          <select {...register("role", {required: true})} className="input">
            {Object.keys(UserRole).map((r, index) => (
              <option key={index}>{r}</option>
            ))}
          </select>
          <ButtonValidOrNot
            canClick={isValid}
            loading={loading}
            actionText="Create Account"
          />
          {createAccountResult?.createAccount.error && (
            <FormError errorMessage={createAccountResult.createAccount.error} />
          )}
        </form>
        <div>
          Already have an account ?{" "}
          <Link className="text-lime-600 hover:underline" to="/">
            Log In now
          </Link>
        </div>
      </div>
    </div>
  );
};
