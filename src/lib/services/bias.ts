import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ["bias-immunization"],
});

export const biasImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // scorecard start
    getTotalRecipients: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/total-immunization/total-recepients`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getTotalFullBias: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/total-immunization/total-full-bias`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getTotalCampakRubela: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/total-immunization/total-campak-rubela`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getTotalDt1: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/total-immunization/total-dt-1`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getTotalTd1: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/total-immunization/total-td-1`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getTotalTd2: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/total-immunization/total-td-2`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getTotalTd3: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/total-immunization/total-td-3`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getTotalHpv1: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/total-immunization/total-hpv-1`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getTotalHpv2: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/total-immunization/total-hpv-2`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    // scorecard end
    // setion grafik 1
    getTotal: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/regional-coverage-trend-graph/get-total`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getTotalHighest: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/regional-coverage-trend-graph/get-total-highest`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getTotalLowest: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/regional-coverage-trend-graph/get-total-lowest`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getAllRegion: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/regional-coverage-trend-graph/get-all-region`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getListFaskes: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/get-list-faskes`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getChart: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/cumulative-coverage-recipients/get-chart`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getPct: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/cumulative-coverage-recipients/get-pct`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getFullBiasScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/immunization-chart-by-type/full-bias-scope`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getHighestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/immunization-chart-by-type/highest-scope`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getLowestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/immunization-chart-by-type/lowest-scope`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    getExceedTargetScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/immunization-chart-by-type/exceed-target-scope`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
    // setion grafik 1
  }),
});

export const {
  // scorecard start
  useGetTotalRecipientsQuery,
  useGetTotalFullBiasQuery,
  useGetTotalCampakRubelaQuery,
  useGetTotalDt1Query,
  useGetTotalTd1Query,
  useGetTotalTd2Query,
  useGetTotalTd3Query,
  useGetTotalHpv1Query,
  useGetTotalHpv2Query,
  // scorecard end

  useGetTotalQuery,
  useGetTotalHighestQuery,
  useGetTotalLowestQuery,
  useGetAllRegionQuery,
  useGetListFaskesQuery,
  useGetChartQuery,
  useGetPctQuery,
  useGetFullBiasScopeQuery,
  useGetHighestScopeQuery,
  useGetLowestScopeQuery,
  useGetExceedTargetScopeQuery,
} = biasImmunizationApi;
