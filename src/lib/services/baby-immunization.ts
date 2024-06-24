import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ["bayi-immunization"],
});

export const babyImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // ---
    getTotalImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/total-bayi-immunization-recipients`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeCommpleteBase: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-complete-base-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),

    //
    getTotalImmunizationByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-immunization/by-vaccine-type`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getDoPercentageDPHTHBHIB: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/do-percentage-dpht-hb-hib`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getDoPercentageCampakRubela: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/do-percentage-campak-rubela`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    // ---
    getTotalScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-scope`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getTotalHighestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-highest-scope`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getTotalLowestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-lowest-scope`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getPercentageTotalImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/percentage-total-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    // ---
    getScopePercentagePerMonth: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/scope-percentage-per-month`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getSummaryScopePercentage: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/summary-scope-percentage`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    // ---
    getTotalScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-scope-by-vaccine-type`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getTotalHighestScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-highest-scope-by-vaccine-type`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getTotalLowestScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-lowest-scope-by-vaccine-type`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getExceedTargetPerVaccine: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/exceed-target-per-vaccine`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getInExceedTargetPerVaccine: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/in-exceed-target-per-vaccine`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getSummaryImmunizationPerVaccine: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/summary-immunization-per-vaccine`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    // ---
    getMaxImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/max-immunization-by-age`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getHighestImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/highest-immunization-by-age`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getSummaryImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/summary-immunization-by-age`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    // ---
    getAverageImmunizationByGender: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/average-immunization-by-gender`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getImmunizationWithHighetMaleRecivient: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/immunization-with-highet-male-recivient`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getImmunizationWithHighetFemaleRecivient: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/immunization-with-highet-female-recivient`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getSummaryImmunizationPerGender: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/summary-immunization-per-gender`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
  }),
});

export const {
  useGetTotalImmunizationQuery,
  useGetScopeCommpleteBaseQuery,

  //
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
  useGetTotalScopeByVaccineTypeQuery,
} = babyImmunizationApi;
