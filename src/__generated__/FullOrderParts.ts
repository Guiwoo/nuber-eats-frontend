/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: FullOrderParts
// ====================================================

export interface FullOrderParts_customer {
  __typename: "User";
  id: number;
  email: string;
}

export interface FullOrderParts_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface FullOrderParts_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface FullOrderParts {
  __typename: "Order";
  id: number;
  total: number | null;
  status: OrderStatus;
  customer: FullOrderParts_customer | null;
  driver: FullOrderParts_driver | null;
  restaurant: FullOrderParts_restaurant | null;
}
