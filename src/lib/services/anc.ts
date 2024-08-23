import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ["anc-immunization"],
});

export const ancImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getTotalImmunizationAnc: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/anc-immunization/total`,
        params: options,
      }),
      providesTags: ["anc-immunization"],
    }),
    getTopDisease: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/anc-immunization/top-diseases`,
        params: options,
      }),
      providesTags: ["anc-immunization"],
    }),
  }),
});

export const { useGetTotalImmunizationAncQuery, useGetTopDiseaseQuery } =
  ancImmunizationApi;
