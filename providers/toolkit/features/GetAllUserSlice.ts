import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  Orders: any;
};

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://shop-smart-psi.vercel.app/api" || "http://localhost:3000/api/",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<Array<User>, void>({
      query: () => "get-all-users",
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `get-all-users/${id}`,
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = userAPI;
