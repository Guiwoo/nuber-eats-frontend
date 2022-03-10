import {gql, useMutation} from "@apollo/client";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {ButtonValidOrNot} from "../../components/buttonValidOrNot";
import {HelmetLayout} from "../../components/HelmetLayout";
import {createDish, createDishVariables} from "../../__generated__/createDish";
import Nuber from "../../images/topBar.png";
import {MY_RESTAURANT_QUERY} from "./myRestaurant";
import {useState} from "react";

interface IParams {
  id: string;
}

interface IForms {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
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
    setValue,
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
    const {name, price, description, ...rest} = getValues();
    const optObj = optionsNumber.map((theId) => ({
      name: rest[`${theId}-Opt-Name`],
      extra: +rest[`${theId}-Opt-Extra`],
    }));
    _createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
          options: optObj,
        },
      },
    });
    navigate(-1);
  };
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const clickHandler = () => {
    setOptionsNumber((cur) => [Date.now(), ...cur]);
  };
  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((cur) => cur.filter((id) => id !== idToDelete));
    setValue(`${idToDelete}-Opt-Name`, "");
    setValue(`${idToDelete}-Opt-Extra`, "");
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
            <div>
              <h4 className="font-medium mb-3 text-lg text-white">
                Dish Options
              </h4>
              <span
                onClick={clickHandler}
                className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
              >
                Add Dish Option
              </span>
              {optionsNumber.length !== 0 &&
                optionsNumber.map((id) => {
                  return (
                    <div key={id} className="mt-5">
                      <input
                        {...register(`${id}-Opt-Name`)}
                        type="text"
                        placeholder="Option Name"
                        className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2 mr-3"
                      />
                      <input
                        {...register(`${id}-Opt-Extra`)}
                        type="number"
                        min={0}
                        placeholder="Option Extra Price"
                        className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
                      />
                      <span
                        className="cursor-pointer text-white bg-red-500 py-3 px-2 ml-3"
                        onClick={() => onDeleteClick(id)}
                      >
                        Delete Option
                      </span>
                    </div>
                  );
                })}
            </div>
            <ButtonValidOrNot
              canClick={isValid}
              actionText={"Create Dish"}
              loading={loading}
            />
          </form>
        </div>
      </div>
    </>
  );
};
