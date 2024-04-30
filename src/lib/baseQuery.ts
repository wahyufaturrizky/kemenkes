import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { setAfterRefreshToken } from '@/lib/features/authSlice';
import { RootState } from '@/lib/store';
import { API_URL } from '@/helpers/config';


export const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: async (headers, { getState }) => {
    // const token = (getState() as RootState)?.auth?.token;
    // if (token) {
    //   headers.set('authorization', `Bearer ${token}`)
    // }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown | undefined, FetchBaseQueryError | undefined> = async (
  args,
  api,
  extraOptions
) => {
  const token = "";
  const refreshToken = "";
  let result = await baseQuery(args, api, extraOptions);
  if ((result.error) && result.error.status === 401) {
    try {
      const payload = { token, refreshToken }
      // try to get a new token
      const res: any = await baseQuery(
        {
          url: `${API_URL}/api/general/auth/refresh`,
          method: 'POST',
          body: payload,
        },
        api,
        extraOptions
      );
      if (res?.data?.token) {
        // store the new token
        api.dispatch(setAfterRefreshToken({
          token: res.data.token,
          refreshToken: res.data.refreshToken
        }))
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // signOut()
      }
    } catch (error) {
      // signOut()
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
