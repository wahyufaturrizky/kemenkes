import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ["pnc"] });

export const pncApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getScoreCard: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/satusehat-pnc/score-card`,
        params: options,
      }),
      providesTags: ["pnc"],
    }),
    getScopePostfarum: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/satusehat-pnc/scope-postpartum-based-region`,
        params: options,
      }),
      providesTags: ["pnc"],
    }),
  }),
});

export const { useGetScoreCardQuery, useGetScopePostfarumQuery } = pncApi;
