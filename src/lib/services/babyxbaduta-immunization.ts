import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ["babyxbaduta-immunization"] });

export const badutaImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // ---
    getTotalScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/immunization-scope-of-kejar`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getTotalHighestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/highest-scope-of-kejar`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getTotalLowestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/lowest-scope-of-kejar`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getPercentageTotalImmunization: build.query({
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
    getTotalHighestScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/highest-scope-of-kejar-immunization`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getTotalLowestScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/lowest-scope-of-kejar-immunization`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    // ---
    getScopePercentagePerMonth: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi-baduta/immunization-graph-kejar-status`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getSummaryImmunizationPerVaccine: build.query({
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
  useGetTotalScopeQuery,
  useGetTotalHighestScopeQuery,
  useGetTotalLowestScopeQuery,
  useGetPercentageTotalImmunizationQuery,
  useGetAverageImmunizationByGenderQuery,
  useGetHighestImmunizationByAgeQuery,
  useGetImmunizationWithHighetFemaleRecivientQuery,
  useGetImmunizationWithHighetMaleRecivientQuery,
  useGetMaxImmunizationByAgeQuery,
  useGetScopePercentagePerMonthQuery,
  useGetSummaryImmunizationByAgeQuery,
  useGetSummaryImmunizationPerGenderQuery,
  useGetSummaryImmunizationPerVaccineQuery,
  useGetTotalHighestScopeByVaccineTypeQuery,
  useGetTotalLowestScopeByVaccineTypeQuery,
  useGetTotalScopeByVaccineTypeQuery,
  useGetDistributionGraphTimeQuery,
  useGetTotalImmunizationScopeQuery
} = badutaImmunizationApi;
