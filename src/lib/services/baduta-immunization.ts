import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ["baduta-immunization"] });

export const badutaImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getTotalImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-immunization`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getTotalImmunizationByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-immunization/by-vaccine-type`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getDoPercentageDPHTHBHIB: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/do-percentage-dpht-hb-hib`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getDoPercentageCampakRubela: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/do-percentage-campak-rubela`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getTotalScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-scope`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getTotalHighestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-highest-scope`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getTotalLowestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/total-lowest-scope`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
    }),
    getPercentageTotalImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/baduta-immunization/percentage-total-immunization`,
        params: options,
      }),
      providesTags: ["baduta-immunization"],
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
  useGetPercentageTotalImmunizationQuery
} = badutaImmunizationApi;
