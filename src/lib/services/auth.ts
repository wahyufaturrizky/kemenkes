import { API_URL } from '@/helpers/config';
import { baseApi } from '@/lib/baseQuery';

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ["auth"] });

export const authApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCurrentUser: build.query({
      query: () => ({
        url: `${API_URL}/api/general/auth/current-user`,
      }),
    }),
    getRefreshToken: build.mutation({
      query: (payload: { token: string; refreshToken: string }) => ({
        url: `${API_URL}/api/general/auth/refresh`,
        method: 'POST',
        body: payload,
      }),
    }),
    revokeUser: build.mutation({
      query: () => ({
        url: `${API_URL}/api/general/auth/revoke`,
      }),
    }),
  }),
});

export const { useLazyGetCurrentUserQuery, useGetCurrentUserQuery, useGetRefreshTokenMutation, useRevokeUserMutation } =
  authApi;
