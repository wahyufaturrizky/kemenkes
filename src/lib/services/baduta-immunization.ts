import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ["baduta-immunization"] });

export const badutaImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // ---
    getTotalImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/total-baduta-immunization-recipients`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getTotalImmunizationByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/scope-baduta-immunization`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getDoPercentageDPHTHBHIB: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/scope-dpt-immunization`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getDoPercentageCampakRubela: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/scope-rubela-immunization`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getDoPercentagePCV: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/scope-rubela-immunization`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getDoPercentageDPT: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/dropout-dpt-percentage`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getDoPercentageRubela: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/dropout-rubela-percentage`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    // ---
    getTotalScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/total-baduta-immunization-scope`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getTotalHighestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/highest-scope-immunization`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getTotalLowestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/lowest-scope-immunization`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getPercentageTotalImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/graph-immunization-scope`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    // ---
    getScopePercentagePerMonth: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/cumulative-scope-immunization`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getSummaryScopePercentage: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/total-cumulative-scope-immunization`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    // ---
    getTotalScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/scope-complete-baduta-immunization`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getTotalHighestScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/highest-scope-immunization-type`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getTotalLowestScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/lowest-scope-immunization-type`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getSurpaseTargetPerVaccine: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/immunization-type-surpase-target-scope`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getSummaryImmunizationPerVaccine: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/graph-scope-immunization-type`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    // ---
    getMaxImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/highest-immunization-non-ideal-age`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getHighestImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/highest-immunization-ideal-age`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getSummaryImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/graph-immunization-age`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    // ---
    getAverageImmunizationByGender: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/average-immunization-gender`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getImmunizationWithHighetMaleRecivient: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/most-immunization-type-male`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getImmunizationWithHighetFemaleRecivient: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/most-immunization-type-female`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getSummaryImmunizationPerGender: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v2/immunization-bayi-baduta/graph-immunization-gender`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
  }),
});

export const {
  useGetTotalImmunizationQuery,
  useGetTotalImmunizationByVaccineTypeQuery,
  useGetDoPercentageDPHTHBHIBQuery,
  useGetDoPercentageCampakRubelaQuery,
  useGetDoPercentageDPTQuery,
  useGetDoPercentagePCVQuery,
  useGetDoPercentageRubelaQuery,
  useGetTotalScopeQuery,
  useGetTotalHighestScopeQuery,
  useGetTotalLowestScopeQuery,
  useGetPercentageTotalImmunizationQuery,
  useGetAverageImmunizationByGenderQuery,
  useGetSurpaseTargetPerVaccineQuery,
  useGetHighestImmunizationByAgeQuery,
  useGetImmunizationWithHighetFemaleRecivientQuery,
  useGetImmunizationWithHighetMaleRecivientQuery,
  useGetMaxImmunizationByAgeQuery,
  useGetScopePercentagePerMonthQuery,
  useGetSummaryImmunizationByAgeQuery,
  useGetSummaryImmunizationPerGenderQuery,
  useGetSummaryImmunizationPerVaccineQuery,
  useGetSummaryScopePercentageQuery,
  useGetTotalHighestScopeByVaccineTypeQuery,
  useGetTotalLowestScopeByVaccineTypeQuery,
  useGetTotalScopeByVaccineTypeQuery
} = badutaImmunizationApi;
