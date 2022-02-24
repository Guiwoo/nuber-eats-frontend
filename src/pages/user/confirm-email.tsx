import {gql, useApolloClient, useMutation} from "@apollo/client";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useMe} from "../../hooks/useMe";
import {useQueryParams} from "../../hooks/useQueryParams";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const {data: userData} = useMe();
  const client = useApolloClient();
  const navigate = useNavigate();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: {ok},
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      navigate("/");
    }
  };
  const [_verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    }
  );

  const code = useQueryParams("code");
  useEffect(() => {
    _verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming Email...</h2>
      <h4 className=" text-gray-500 text-sm">
        Please wait,do not close this page..
      </h4>
    </div>
  );
};
