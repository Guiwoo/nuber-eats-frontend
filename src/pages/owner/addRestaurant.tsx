import {gql, useApolloClient, useMutation} from "@apollo/client";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {ButtonValidOrNot} from "../../components/buttonValidOrNot";
import {FormError} from "../../components/form-error";
import {HelmetLayout} from "../../components/HelmetLayout";
import Nuber from "../../images/topBar.png";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../__generated__/createRestaurant";
import {MY_RESTAURANT_QUERY} from "./myRestaurant";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  coverImage: string;
  address: string;
  categoryName: string;
}

export const AddRestaurant = () => {
  const client = useApolloClient();
  const [uploading, setUploading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const {
    register,
    getValues,
    formState: {isValid},
    handleSubmit,
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const onCompleted = (data: createRestaurant) => {
    const {coverImage, name, categoryName, address} = getValues();
    const {
      createRestaurant: {ok, restaurantId},
    } = data;
    if (ok) {
      setUploading(false);
      const queryResult = client.readQuery({query: MY_RESTAURANT_QUERY});
      client.writeQuery({
        query: MY_RESTAURANT_QUERY,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                coverImage: imgUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
      navigate("/");
    }
  };
  const [_createRestaurantMutation, {error, data}] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
  });
  const onSubmit = async () => {
    try {
      const {coverImage, name, categoryName, address} = getValues();
      setUploading(true);
      const file = coverImage[0];
      const formBody = new FormData();
      formBody.append("file", file);
      const {url} = await (
        await fetch("http://localhost:4000/uploads", {
          method: "POST",
          body: formBody,
        })
      ).json();
      setImgUrl(url);
      _createRestaurantMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImage: url,
          },
        },
      });
    } catch (error) {}
  };
  return (
    <>
      <div
        className="bg-cover bg-no-repeat bg-center w-screen h-full absolute z-0 opacity-70"
        style={{backgroundImage: `url(${Nuber})`, zIndex: -1}}
      ></div>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="container flex flex-col justify-center items-center">
          <HelmetLayout title="Create Restaurant" />
          <h1 className=" text-2xl font-bold border-b-2 border-black text-black">
            Create Restaurant
          </h1>
          <form
            className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="input"
              type="text"
              placeholder="Name"
              {...register("name", {required: "Name is required."})}
            />
            <input
              className="input"
              type="text"
              placeholder="Address"
              {...register("address", {required: "Address is required."})}
            />
            <input
              className="input"
              type="text"
              placeholder="Category Name"
              {...register("categoryName", {
                required: "Category Name is required.",
              })}
            />
            <div>
              <input
                className="input border-gray-500 w-full"
                {...register("coverImage", {required: true})}
                type="file"
                accept="image/*"
              />
            </div>
            <ButtonValidOrNot
              canClick={isValid}
              actionText={"Create Restaurant"}
              loading={uploading}
            ></ButtonValidOrNot>
            {data?.createRestaurant?.error && (
              <FormError errorMessage={data?.createRestaurant?.error} />
            )}
          </form>
        </div>
      </div>
    </>
  );
};
