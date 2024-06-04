import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ["babyxbaduta-immunization"] });

export const badutaImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // ---
    getImmunizationScopeKejar: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/immunization-scope-of-kejar`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getHighestScopeKejar: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/highest-scope-of-kejar`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getLowestScopeKejar: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/lowest-scope-of-kejar`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getGraphTotal: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/graph`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    // ---
    getTotalScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/total-scope-by-vaccine-type`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getHighestScopeKejarImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/highest-scope-of-kejar-immunization`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getLowestScopeKejarImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/lowest-scope-of-kejar-immunization`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    // ---
    getImmunizationGraphKejarStatus: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/immunization-graph-kejar-status`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    // ---
    getMaxImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/max-immunization-by-age`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getHighestImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/highest-immunization-by-age`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getSummaryImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/immunization-graph-age`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    // ---
    getAverageImmunizationByGender: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/average-immunization-gender`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getImmunizationWithHighetMaleRecivient: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/most-immunization-type-male`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getImmunizationWithHighetFemaleRecivient: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/most-immunization-type-female`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getSummaryImmunizationPerGender: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/immunization-graph-gender`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getDistributionGraphTime: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/distribution-graph-time`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getTotalImmunizationScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/total-immunization-scope`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
  }),
});

export const {
  useGetGraphTotalQuery,
  useGetHighestScopeKejarImmunizationQuery,
  useGetLowestScopeKejarImmunizationQuery,
  useGetHighestScopeKejarQuery,
  useGetImmunizationGraphKejarStatusQuery,
  useGetImmunizationScopeKejarQuery,
  useGetLowestScopeKejarQuery,
  useGetAverageImmunizationByGenderQuery,
  useGetHighestImmunizationByAgeQuery,
  useGetImmunizationWithHighetFemaleRecivientQuery,
  useGetImmunizationWithHighetMaleRecivientQuery,
  useGetMaxImmunizationByAgeQuery,
  useGetSummaryImmunizationByAgeQuery,
  useGetSummaryImmunizationPerGenderQuery,
  useGetTotalScopeByVaccineTypeQuery,
  useGetDistributionGraphTimeQuery,
  useGetTotalImmunizationScopeQuery
} = badutaImmunizationApi;
