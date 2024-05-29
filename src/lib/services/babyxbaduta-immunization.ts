import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ["babyxbaduta-immunization"] });

export const badutaImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // ---
    getTotalImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-immunization`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getTotalImmunizationByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-immunization/by-vaccine-type`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getDoPercentageDPHTHBHIB: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/do-percentage-dpht-hb-hib`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getDoPercentageCampakRubela: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/do-percentage-campak-rubela`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    // ---
    getTotalScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-scope`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getTotalHighestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-highest-scope`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getTotalLowestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-lowest-scope`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getPercentageTotalImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/percentage-total-immunization`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    // ---
    getScopePercentagePerMonth: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/scope-percentage-per-month`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getSummaryScopePercentage: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/summary-scope-percentage`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    // ---
    getTotalScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-scope-by-vaccine-type`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getTotalHighestScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-highest-scope-by-vaccine-type`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getTotalLowestScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-lowest-scope-by-vaccine-type`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getExceedTargetPerVaccine: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/exceed-target-per-vaccine`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getInExceedTargetPerVaccine: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/in-exceed-target-per-vaccine`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getSummaryImmunizationPerVaccine: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/summary-immunization-per-vaccine`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    // ---
    getMaxImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/max-immunization-by-age`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getHighestImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/highest-immunization-by-age`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getSummaryImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/summary-immunization-by-age`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    // ---
    getAverageImmunizationByGender: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/average-immunization-by-gender`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getImmunizationWithHighetMaleRecivient: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/immunization-with-highet-male-recivient`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getImmunizationWithHighetFemaleRecivient: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/immunization-with-highet-female-recivient`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
    getSummaryImmunizationPerGender: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/summary-immunization-per-gender`,
        params: options,
      }),
      providesTags: ["babyxbaduta-immunization"],
    }),
  }),
});

export const {
  useGetTotalImmunizationQuery,
  useGetTotalImmunizationByVaccineTypeQuery,
  useGetDoPercentageDPHTHBHIBQuery,
  useGetDoPercentageCampakRubelaQuery,
  useGetTotalScopeQuery,
  useGetTotalHighestScopeQuery,
  useGetTotalLowestScopeQuery,
  useGetPercentageTotalImmunizationQuery,
  useGetAverageImmunizationByGenderQuery,
  useGetExceedTargetPerVaccineQuery,
  useGetHighestImmunizationByAgeQuery,
  useGetImmunizationWithHighetFemaleRecivientQuery,
  useGetImmunizationWithHighetMaleRecivientQuery,
  useGetInExceedTargetPerVaccineQuery,
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
