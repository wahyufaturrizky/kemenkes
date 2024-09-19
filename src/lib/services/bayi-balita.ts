import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ["bayi-balita"],
});

export const bayiBalitaApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getTotalKidsHavingMeasurement: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-balita/kids-having-measurement`,
        params: options,
      }),
      providesTags: ["bayi-balita"],
    }),
    getBalitaMinitoredMoreThan2: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-balita/balita-monitored-more-than-2`,
        params: options,
      }),
      providesTags: ["bayi-balita"],
    }),
    getMeaserementResult: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-balita/measurement-result`,
        params: options,
      }),
      providesTags: ["bayi-balita"],
    }),
    getNutritionGovernance: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-balita/nutrition-governance`,
        params: options,
      }),
      providesTags: ["bayi-balita"],
    }),
    getVisitationAnalytic: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-balita/visitation-analytic`,
        params: options,
      }),
      providesTags: ["bayi-balita"],
    }),
    getVisitationFaskes: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-balita/balita-visitation-faskes`,
        params: options,
      }),
      providesTags: ["bayi-balita"],
    }),
    getAnaliticIndicator: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-balita/analytic-indicator?column=TB/U&analytic_type=waktu`,
        params: options,
      }),
      providesTags: ["bayi-balita"],
    }),
  }),
});

export const {
  useGetTotalKidsHavingMeasurementQuery,
  useGetBalitaMinitoredMoreThan2Query,
  useGetMeaserementResultQuery,
  useGetNutritionGovernanceQuery,
  useGetVisitationAnalyticQuery,
  useGetVisitationFaskesQuery,
  useGetAnaliticIndicatorQuery,
} = bayiBalitaApi;
