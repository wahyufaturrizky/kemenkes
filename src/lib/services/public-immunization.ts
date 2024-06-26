import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ["public-immunization"] });

export const publicImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // ---
    getListVaccine: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/get-list-vaccine`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    // ---
    getTotalUniqueBaby: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-unique-baby`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalUniqueBaduta: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-unique-baduta`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalUniqueBias: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-unique-bias`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalUniqueWus: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-unique-wus`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalUniqueBaseComplete: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-unique-base-complete`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalUniqueAntigenComplete: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-unique-antigen-complete`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalUniqueBadutaComplete: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-unique-baduta-complete`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    // ---
    getTotalUniqueBiasComplete: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-unique-bias-complete`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalUniqueT2Complete: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-unique-t2-complete`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    // ---
    getTotalProvinceExceedTarget: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-province-exceed-target`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalProvinceNotExceedTarget: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-province-not-exceed-target`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalCityExceedTarget: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-city-exceed-target`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalCityNotExceedTarget: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-city-not-exceed-target`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalHighestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-highest-scope`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalLowestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-lowest-scope`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    // ---
    getTotalCumulativeChartScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-cumulative-chart-scope`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalCumulativeScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-cumulative-scope`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    // ---
    getTotalBaseCumulative: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-base-cumulative-scope`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalBaseHighestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-base-highest-scope`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalBaseLowestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-base-lowest-scope`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
    getTotalChartProvince: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/public-immunization/total-chart-province`,
        params: options,
      }),
      providesTags: ["public-immunization"],
    }),
  }),
});

export const {
  useGetListVaccineQuery,
  useGetTotalBaseCumulativeQuery,
  useGetTotalBaseHighestScopeQuery,
  useGetTotalBaseLowestScopeQuery,
  useGetTotalChartProvinceQuery,
  useGetTotalCityExceedTargetQuery,
  useGetTotalCityNotExceedTargetQuery,
  useGetTotalCumulativeChartScopeQuery,
  useGetTotalCumulativeScopeQuery,
  useGetTotalHighestScopeQuery,
  useGetTotalLowestScopeQuery,
  useGetTotalProvinceExceedTargetQuery,
  useGetTotalProvinceNotExceedTargetQuery,
  useGetTotalUniqueAntigenCompleteQuery,
  useGetTotalUniqueBabyQuery,
  useGetTotalUniqueBadutaCompleteQuery,
  useGetTotalUniqueBadutaQuery,
  useGetTotalUniqueBaseCompleteQuery,
  useGetTotalUniqueBiasCompleteQuery,
  useGetTotalUniqueBiasQuery,
  useGetTotalUniqueT2CompleteQuery,
  useGetTotalUniqueWusQuery
} = publicImmunizationApi;
