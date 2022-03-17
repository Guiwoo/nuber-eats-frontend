import {useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import Nuber from "../../images/topBar.png";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {HelmetLayout} from "../../components/HelmetLayout";
import {
  CATEGORY_FRAMENT,
  DISH_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "../../fragment";
import {CategoryList} from "../../components/categoryList";
import {Pagination} from "../../components/pagination";
import {RestaurantList} from "../../components/restaurantList";

const RESTAURANT_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
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
  ${CATEGORY_FRAMENT}
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
              <Link key={index} to={`/category/${c.slug}`}>
                <CategoryList
                  coverImage={c.coverImage || ""}
                  name={c.name}
                  id={c.id + ""}
                />
              </Link>
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
          <Pagination totalPages={data?.restaurants.totalPages} />
        </div>
      )}
    </div>
  );
};
