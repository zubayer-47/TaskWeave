import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  // baseUrl: 'http://localhost:8000/api/v1',
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  prepareHeaders: async (headers, { getState }) => {
    const access_token = (getState() as RootState).auth.access_token;

    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("token") || "{}");

      headers.set("Authorization", access_token ?? token);
    }

    return headers;
  },
});

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if ("error" in result) {
      // TODO: 22/06
      // const retries = extraOptions?.retries || 0;

      // if (retries < maxRetries) {
      // 	// Retry the request
      // 	const retryResult = await baseQuery(args, api, {
      // 		...extraOptions,
      // 		retries: retries + 1,
      // 	});
      // 	// Return the retry result
      // 	return retryResult;
      // }

      // if (result?.error?.status === 401 || result.error?.status === 404) {
      if (result?.error?.status === 401 || result?.error?.status === 403) {
        api.dispatch(userLoggedOut());

        if (typeof window !== "undefined") {
          localStorage.clear();
        }
      }
    }

    return result;
  },
  keepUnusedDataFor: 30,
  endpoints: () => ({}),
  tagTypes: [],
});
