/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchProductsList
// ====================================================

export interface FetchProductsList_books {
  __typename: "Book";
  title: string | null;
  author: string | null;
}

export interface FetchProductsList {
  books: (FetchProductsList_books | null)[] | null;
}
