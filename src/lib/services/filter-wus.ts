import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ["api-filter-wus"],
});

export const apiFilterWus = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getJenisStatusList: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/jenis-status-list`,
        params: options,
      }),
      providesTags: ["api-filter-wus"],
    }),
    getWomencategory: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/women-category-list`,
        params: options,
      }),
      providesTags: ["api-filter-wus"],
    }),
  }),
});

export const { useGetJenisStatusListQuery, useGetWomencategoryQuery } = apiFilterWus;
