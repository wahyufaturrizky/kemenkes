import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ["bias-immunization"],
});

export const biasImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getTotalFullBias: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bias-immunization/total-immunization/total-full-bias`,
        params: options,
      }),
      providesTags: ["bias-immunization"],
    }),
  }),
});

export const { useGetTotalFullBiasQuery } = biasImmunizationApi;
