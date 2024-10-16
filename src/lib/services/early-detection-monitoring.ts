import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ["remaja"],
});

export const earlyDetectionMonitoringApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getBodyMassIndexAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/usia-sekolah-dan-remaja/body-mass-index-age`,
        params: options,
      }),
      providesTags: ["remaja"],
    }),
    getBloodPresure: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/usia-sekolah-dan-remaja/blood-presure`,
        params: options,
      }),
      providesTags: ["remaja"],
    }),
    getVision: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/usia-sekolah-dan-remaja/vision`,
        params: options,
      }),
      providesTags: ["remaja"],
    }),
    getHearing: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/usia-sekolah-dan-remaja/hearing`,
        params: options,
      }),
      providesTags: ["remaja"],
    }),
    getMentalHealth: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/usia-sekolah-dan-remaja/mental-health`,
        params: options,
      }),
      providesTags: ["remaja"],
    }),
    getNapzaScreening: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/usia-sekolah-dan-remaja/napza-screening`,
        params: options,
      }),
      providesTags: ["remaja"],
    }),
    getHealth: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/usia-sekolah-dan-remaja/health`,
        params: options,
      }),
      providesTags: ["remaja"],
    }),
    getFitness: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/usia-sekolah-dan-remaja/fitness`,
        params: options,
      }),
      providesTags: ["remaja"],
    }),
    getAnemiaScreening: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/usia-sekolah-dan-remaja/anemia-screening`,
        params: options,
      }),
      providesTags: ["remaja"],
    }),
    getSmoking: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/usia-sekolah-dan-remaja/smoking`,
        params: options,
      }),
      providesTags: ["remaja"],
    }),
    getCigaretteSmoking: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/usia-sekolah-dan-remaja/cigarette-smoking`,
        params: options,
      }),
      providesTags: ["remaja"],
    }),
  }),
});

export const {
  useGetBodyMassIndexAgeQuery,
  useGetBloodPresureQuery,
  useGetVisionQuery,
  useGetHearingQuery,
  useGetMentalHealthQuery,
  useGetNapzaScreeningQuery,
  useGetHealthQuery,
  useGetFitnessQuery,
  useGetAnemiaScreeningQuery,
  useGetSmokingQuery,
  useGetCigaretteSmokingQuery,
} = earlyDetectionMonitoringApi;
