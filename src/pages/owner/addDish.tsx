import {gql, useMutation} from "@apollo/client";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {ButtonValidOrNot} from "../../components/buttonValidOrNot";
import {HelmetLayout} from "../../components/HelmetLayout";
import {createDish, createDishVariables} from "../../__generated__/createDish";
import Nuber from "../../images/topBar.png";
import {MY_RESTAURANT_QUERY} from "./myRestaurant";

interface IParams {
  id: string;
}

interface IForms {
  name: string;
  price: string;
  description: string;
}

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

export const AddDish = () => {
  const {id: restaurantId} = useParams<keyof IParams>() as IParams;
  const {
    register,
    handleSubmit,
    formState: {isValid},
    getValues,
  } = useForm<IForms>({
    mode: "onChange",
  });
  const [_createDishMutation, {loading}] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: +restaurantId,
          },
        },
      },
    ],
  });
  const navigate = useNavigate();

  const onSubmit = () => {
    const {name, price, description} = getValues();
    _createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
        },
      },
    });
    navigate(-1);
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
            Create Dish
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
              type="number"
              min={0}
              placeholder="Price"
              {...register("price", {required: "Price is required.", min: 0})}
            />
            <input
              className="input"
              type="text"
              placeholder="Description"
              {...register("description", {
                required: "Description is required.",
              })}
            />
            <ButtonValidOrNot
              canClick={isValid}
              actionText={"Create Dish"}
              loading={loading}
            />
            {/* {data?.createRestaurant?.error && (
              <FormError errorMessage={data?.createRestaurant?.error} />
            )} */}
          </form>
        </div>
      </div>
    </>
  );
};
