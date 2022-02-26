import {useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import Nuber from "../../images/topBar.png";
import {RestaurantList} from "../../components/restaurantList";
import {useForm} from "react-hook-form";
import {createSearchParams, useNavigate} from "react-router-dom";
import {HelmetLayout} from "../../components/HelmetLayout";
import {RESTAURANT_FRAGMENT} from "../../fragment";

const RESTAURANT_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IFormProps {
  searchTerms: string;
}

export const Restaurant = () => {
  const {register, handleSubmit, getValues} = useForm<IFormProps>();
  const [page, setPage] = useState(1);
  const navigation = useNavigate();
  const {data, loading} = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANT_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  //page
  const onNextPageClick = () => setPage(page + 1);
  const onPrevPageClick = () => setPage(page - 1);
  //Submit get Search
  const onSearchSubmit = () => {
    const searchTerms = getValues().searchTerms;
    navigation({
      pathname: "/search",
      search: `term=${searchTerms}`,
    });
  };
  return (
    <div>
      <HelmetLayout title="Home" />
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        style={{backgroundImage: `url(${Nuber})`}}
        className="bg-cover bg-no-repeat bg-center w-full py-40 flex items-center justify-center"
      >
        <input
          {...register("searchTerms", {required: true, min: 3})}
          className="input rounded-md w-2/3 md:w-5/12 border 0"
          type="search"
          placeholder="Search Restaurant..."
        />
      </form>
      {!loading && (
        <div className=" max-w-screen-lg mx-auto mt-8 px-5">
          <div className="flex justify-around max-w-screen-sm mx-auto">
            {data?.allCategories.categories?.map((c, index) => (
              <div key={index} className="group flex flex-col items-center">
                <div
                  className="group-hover:border-red-300 border w-16 h-16 bg-cover bg-center rounded-full"
                  style={{backgroundImage: `url(${c.coverImage})`}}
                ></div>
                <span className="group capitalize mt-3 text-sm text-center font-medium">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-8 pb-20">
            {data?.restaurants.results?.map((r, index) => (
              <RestaurantList
                key={index}
                name={r.name}
                id={r.id + ""}
                coverImage={r.coverImage}
                categoryName={r.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md mx-auto">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-xl"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span className="mx-5">
              Page{page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages && (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-xl"
              >
                &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
