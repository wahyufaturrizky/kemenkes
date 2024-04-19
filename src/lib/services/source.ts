import { API_URL } from "@/helpers/config";
import { type SourceFormType } from "@/models/source";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ["sources"] });

export const sourceApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSources: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/api/general/master/sources`,
        params: options,
      }),
      providesTags: ["sources"],
    }),
    getSourcesPaged: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/api/general/master/sources/paged`,
        params: options,
      }),
      providesTags: ["sources"],
    }),
    getSourcesById: build.query({
      query: (id: string) => ({
        url: `${API_URL}/api/general/master/source/${id}`,
      }),
      providesTags: ["sources"],
    }),
    createSource: build.mutation({
      query: (payload: SourceFormType) => ({
        url: `${API_URL}/api/general/master/source`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["sources"],
    }),
    updateSource: build.mutation({
      query: (payload: SourceFormType) => ({
        url: `${API_URL}/api/general/master/source`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["sources"],
    }),
    deleteSource: build.mutation({
      query: (id: string) => ({
        url: `${API_URL}/api/general/master/source/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sources"],
    }),
  }),
});

export const {
  useGetSourcesQuery,
  useGetSourcesPagedQuery,
  useGetSourcesByIdQuery,
  useCreateSourceMutation,
  useUpdateSourceMutation,
  useDeleteSourceMutation,
} = sourceApi;
