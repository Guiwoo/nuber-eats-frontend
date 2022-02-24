import {gql, useApolloClient, useMutation} from "@apollo/client";
import {useForm} from "react-hook-form";
import {ButtonValidOrNot} from "../../components/buttonValidOrNot";
import {EmailPattern} from "../../constant";
import {useMe} from "../../hooks/useMe";
import {
  editProfile,
  editProfileVariables,
} from "../../__generated__/editProfile";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const {data: userData} = useMe();
  const client = useApolloClient();
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: {ok},
    } = data;
    if (ok && userData) {
      //update cache
      const {
        me: {email: prevEmail, id},
      } = userData;
      const {email: newEmail} = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EdittedUser on User {
              email
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          },
        });
      }
    }
  };
  const [_editProfile, {loading}] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });
  const {register, handleSubmit, getValues, formState} = useForm<IFormProps>({
    defaultValues: {
      email: userData?.me.email,
    },
    mode: "onChange",
  });
  const onSubmit = () => {
    const {email, password} = getValues();
    _editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && {password}),
        },
      },
    });
  };
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register("email", {
            pattern: EmailPattern,
          })}
          className="input"
          type="email"
          placeholder="Email"
        />
        <input
          {...register("password")}
          className="input"
          type="password"
          placeholder="Password"
        />
        <ButtonValidOrNot
          loading={loading}
          canClick={formState.isValid}
          actionText={"Save"}
        />
      </form>
    </div>
  );
};
