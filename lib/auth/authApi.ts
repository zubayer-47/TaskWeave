"use client";

import { apiService } from "../api/apiServices";
import { updateUser, userLoggedIn, userLoggedOut } from "./authSlice";
import { LoginParams, RegisterParams, User, UserAuthRes } from "./types";

export const authApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserAuthRes, LoginParams>({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (typeof window !== "undefined") {
            localStorage.setItem("token", JSON.stringify(data.access_token));
          }
          dispatch(userLoggedIn(data));
        } catch (error) {
          console.log(error, "loginApi");
        }
      },
    }),

    register: builder.mutation<UserAuthRes, RegisterParams>({
      query: (credentials) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (typeof window !== "undefined") {
            localStorage.setItem("token", JSON.stringify(data.access_token));
          }
          dispatch(userLoggedIn(data));
        } catch (error) {
          console.log(error, "registerApi");
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/signout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
          }
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error, "logoutApi");
        }
      },
    }),

    profile: builder.query<User, void>({
      query: () => ({
        url: "users/",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (typeof window !== "undefined") {
            const access_token = localStorage.getItem("token");

            dispatch(
              updateUser({
                user: {
                  ...data,
                },
                access_token,
              }),
            );
          }
        } catch (error) {
          console.log(error, "profileApi");
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileQuery,
} = authApi;
