import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ["wus-immunization"],
});

export const wusImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getTotalImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/total-immunization`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getTotalImmunizationPregnant: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/total-immunization/total-pregnant`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getTotalImmunizationFertile: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/total-immunization/total-fertile`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getTotalImmunizationTdWus: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/total-immunization/total-td-wus`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getTotalImmunizationTdWusPregnant: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/total-immunization/total-td-wus-pregnant`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getTotalImmunizationTdWusFertile: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/total-immunization/total-td-wus-fertile`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
  }),
});

export const {
  useGetTotalImmunizationQuery,
  useGetTotalImmunizationPregnantQuery,
  useGetTotalImmunizationFertileQuery,
  useGetTotalImmunizationTdWusQuery,
  useGetTotalImmunizationTdWusPregnantQuery,
  useGetTotalImmunizationTdWusFertileQuery,
} = wusImmunizationApi;
