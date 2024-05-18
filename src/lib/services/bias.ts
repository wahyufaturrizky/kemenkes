import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ["bias-immunization"],
});

export const biasImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
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
  }),
});

export const {
  useGetTotalFullBiasQuery,
  useGetTotalRecipientsQuery,
  useGetTotalCampakRubelaQuery,
  useGetTotalDt1Query,
} = biasImmunizationApi;
