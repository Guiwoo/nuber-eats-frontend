import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
    fragment RestaurantParts on Restaurant{
        id
        name
        coverImage
        category {
          id
          name
          coverImage
        }
        address 
        isPromted
    }
`

export const CATEGORY_FRAMENT = gql`
  fragment CategoryParts on Category {
    id
        name
        coverImage
        slug
        restaurantCount
  }
`

export const DISH_FRAGMENT = gql`
  fragment DishParts on Dish{
   id
   name
   price
    photo
    description
    options{
      name
      extra
      choices{
        name
        extra
      }
    }
    
  }
`

export const OREDERS_FRAGMENT = gql`
  fragment OrdersParts on Order{
    id
    createdAt
    total
    status
  }
`

export const FULL_ORDER_FRAGMENT = gql`
  fragment FullOrderParts on Order {
    id
    total
    status
    customer {
      id
      email
    }
    driver {
      id
      email
    }
    restaurant {
      name
    }
  }
`