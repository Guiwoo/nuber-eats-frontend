import {gql, useQuery} from "@apollo/client";
import {useNavigate, useParams} from "react-router-dom";
import {CATEGORY_FRAMENT, RESTAURANT_FRAGMENT} from "../../fragment";
import {category, categoryVariables} from "../../__generated__/category";
import Nuber from "../../images/topBar.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {RestaurantList} from "../../components/restaurantList";
import {Pagination} from "../../components/pagination";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${CATEGORY_FRAMENT}
  ${RESTAURANT_FRAGMENT}
`;

export const Category = () => {
  const {slug} = useParams();
  const navigation = useNavigate();
  const {data} = useQuery<category, categoryVariables>(CATEGORY_QUERY, {
    variables: {
      input: {
        page: 1,
        slug: slug || "",
      },
    },
  });
  const GoBackHome = () => {
    navigation("/");
  };
  return (
    <div>
      <div className="mb-3">
        <form
          style={{backgroundImage: `url(${Nuber})`}}
          className="bg-cover bg-no-repeat bg-center w-full py-40 flex items-center justify-center"
        >
          <input
            className="input rounded-md w-2/3 md:w-5/12 border 0"
            type="search"
            placeholder="Search Your Address..."
          />
          <button className=" hover:bg-gray-800 px-6 py-4 bg-gray-500 ml-4 rounded-lg text-white">
            Find
          </button>
        </form>
      </div>
      <div className="w-full px-5 xl:px-0 max-w-screen-lg mx-auto">
        <div>
          <button
            onClick={GoBackHome}
            className=" hover:text-lime-600 hover:cursor-pointer font-medium mr-2 text-gray-400"
          >
            Category
          </button>
          <FontAwesomeIcon
            className="font-medium mr-2 text-gray-400"
            icon={faAngleRight}
          />
          <span className="font-medium capitalize ">{slug}</span>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold border-b-2 pb-10">
            Pizza deliver in Korea
          </h2>
          <div className="grid md:grid-cols-3 gap-x-5 py-10">
            {data?.category?.restaurants?.map((r, index) => (
              <RestaurantList
                key={index}
                name={r.name}
                id={r.id + ""}
                coverImage={r.coverImage}
                categoryName={r.category?.name}
              />
            ))}
          </div>
        </div>
        <div>
          <Pagination totalPages={data?.category.totalPages} />
        </div>
      </div>
    </div>
  );
};
