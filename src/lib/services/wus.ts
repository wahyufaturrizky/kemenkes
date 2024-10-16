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
    getTotalImmunizationTotalCoverage: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/total-immunization/get-total-coverage`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getTotalImmunizationTotalCoverageHighest: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/total-immunization/get-total-coverage-highest`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getTotalImmunizationTotalCoverageLowest: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/total-immunization/get-total-coverage-lowest`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getTotalImmunizationTotalCumulativeCoverage: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/total-immunization/get-cumulative-coverage`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getTotalImmunizationTotalCumulativeCoverageRecipients: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/total-immunization/get-cumulative-coverage-recipients`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getDistributionStatusChart: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/get-distribution-status-chart`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getDistributionStatusPregnantChart: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/get-distribution-status-pregnant-chart`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getTotalCumulativeCoverageRecipients: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/total-immunization/get-total-cumulative-coverage-recipients`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    getFaskesWus: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/wus-immunization/faskes-wus-list`,
        params: options,
      }),
      providesTags: ["wus-immunization"],
    }),
    downloadImmunizationExcel: build.mutation({
      query: (body) => ({
        url: `${API_URL}/v1/csv/download`,
        method: "POST",
        body,
        responseType: "blob", // Agar response diinterpretasikan sebagai Blob
      }),
      invalidatesTags: ["wus-immunization"],
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
  useGetTotalImmunizationTotalCoverageQuery,
  useGetTotalImmunizationTotalCoverageHighestQuery,
  useGetTotalImmunizationTotalCoverageLowestQuery,
  useGetTotalImmunizationTotalCumulativeCoverageQuery,
  useGetTotalImmunizationTotalCumulativeCoverageRecipientsQuery,
  useGetDistributionStatusChartQuery,
  useGetDistributionStatusPregnantChartQuery,
  useGetTotalCumulativeCoverageRecipientsQuery,
  useGetFaskesWusQuery,
  useDownloadImmunizationExcelMutation,
} = wusImmunizationApi;
