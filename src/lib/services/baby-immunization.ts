import { API_URL } from "@/helpers/config";
import { baseApi } from "@/lib/baseQuery";

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ["bayi-immunization"],
});

export const babyImmunizationApi = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // ---
    getTotalImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/total-bayi-immunization-recipients`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeCommpleteBase: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-complete-base-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeHb0: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-hb0-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeBcg: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-bcg-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopePolio1: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-polio1-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopePolio2: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-polio2-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopePolio3: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-polio3-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopePolio4: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-polio4-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeDptHbHib1: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-dpt-hb-hib1-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeDptHbHib2: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-dpt-hb-hib2-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeDptHbHib3: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-dpt-hb-hib3-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeRubela: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-rubela-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopePcv1: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-pcv1-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopePcv2: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-pcv2-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeIpv1: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-ipv1-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeIpv2: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-ipv2-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeIpv1Diy: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-ipv1-diy-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeIpv2Diy: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-ipv2-diy-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeIpv3Diy: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-ipv3-diy-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeRotavirus1: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-rotavirus1-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeRotavirus2: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-rotavirus2-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeRotavirus3: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-rotavirus3-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getScopeJe: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-je-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getLeftoutPercentage: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/leftout-percentage`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getDropout: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/dropout-dpt-percentage`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getDropoutRubela: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/dropout-rubela-percentage`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getNumberZero: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/number-zero-dose`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getTotalBayiImmunizationScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/total-bayi-immunization-scope`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getHighestScopeImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/highest-scope-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getLowestScopeImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/lowest-scope-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getGraphImmunizationScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/graph-immunization-scope`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getCumulativeScopeImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/cumulative-scope-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getTotalCumulativeScopeImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/total-cumulative-scope-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getTotalCompleteBase: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/scope-immunization-type`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getHighestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/highest-scope-immunization-type`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getLowestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/lowest-scope-immunization-type`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getTypeSuspase: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/immunization-type-surpase-target-scope`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getGraphScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/graph-scope-immunization-type`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getNonIdealAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/highest-immunization-non-ideal-age`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getIdealAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/highest-immunization-ideal-age`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getGraphImmunizationAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/graph-immunization-age`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getAverageGender: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/average-immunization-gender`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getMostImmunizationTypeMale: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/most-immunization-type-male`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getMostImmunizationTypeFemale: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/most-immunization-type-female`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getGraphImmunizationGender: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/immunization-bayi/graph-immunization-gender`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),

    //==============================================================================================================================
    getTotalImmunizationByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-immunization/by-vaccine-type`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getDoPercentageDPHTHBHIB: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/do-percentage-dpht-hb-hib`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getDoPercentageCampakRubela: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/do-percentage-campak-rubela`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    // ---
    getTotalScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-scope`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getTotalHighestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-highest-scope`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getTotalLowestScope: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-lowest-scope`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getPercentageTotalImmunization: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/percentage-total-immunization`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    // ---
    getScopePercentagePerMonth: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/scope-percentage-per-month`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getSummaryScopePercentage: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/summary-scope-percentage`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    // ---
    getTotalScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-scope-by-vaccine-type`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getTotalHighestScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-highest-scope-by-vaccine-type`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getTotalLowestScopeByVaccineType: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/total-lowest-scope-by-vaccine-type`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getExceedTargetPerVaccine: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/exceed-target-per-vaccine`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getInExceedTargetPerVaccine: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/in-exceed-target-per-vaccine`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getSummaryImmunizationPerVaccine: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/summary-immunization-per-vaccine`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    // ---
    getMaxImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/max-immunization-by-age`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getHighestImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/highest-immunization-by-age`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getSummaryBayiImmunizationByAge: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/summary-immunization-by-age`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    // ---
    getAverageBayiImmunizationByGender: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/average-immunization-by-gender`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getImmunizationBayiWithHighetMaleRecivient: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/immunization-with-highet-male-recivient`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getImmunizationBayiWithHighetFemaleRecivient: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/immunization-with-highet-female-recivient`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getSummaryBayiImmunizationPerGender: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/summary-immunization-per-gender`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
    getListFaskes: build.query({
      query: (options = {}) => ({
        url: `${API_URL}/v1/bayi-immunization/get-list-faskes`,
        params: options,
      }),
      providesTags: ["bayi-immunization"],
    }),
  }),
});

export const {
  useGetTotalImmunizationQuery,
  useGetScopeCommpleteBaseQuery,
  useGetScopeHb0Query,
  useGetScopeBcgQuery,
  useGetScopePolio1Query,
  useGetScopePolio2Query,
  useGetScopePolio3Query,
  useGetScopePolio4Query,
  useGetScopeDptHbHib1Query,
  useGetScopeDptHbHib2Query,
  useGetScopeDptHbHib3Query,
  useGetScopeRubelaQuery,
  useGetScopePcv1Query,
  useGetScopePcv2Query,
  useGetScopeIpv1Query,
  useGetScopeIpv2Query,
  useGetScopeIpv1DiyQuery,
  useGetScopeIpv2DiyQuery,
  useGetScopeIpv3DiyQuery,
  useGetScopeRotavirus1Query,
  useGetScopeRotavirus2Query,
  useGetScopeRotavirus3Query,
  useGetScopeJeQuery,
  useGetLeftoutPercentageQuery,
  useGetDropoutQuery,
  useGetDropoutRubelaQuery,
  useGetNumberZeroQuery,
  useGetTotalBayiImmunizationScopeQuery,
  useGetHighestScopeImmunizationQuery,
  useGetLowestScopeImmunizationQuery,
  useGetGraphImmunizationScopeQuery,
  useGetCumulativeScopeImmunizationQuery,
  useGetTotalCumulativeScopeImmunizationQuery,
  useGetTotalCompleteBaseQuery,
  useGetHighestScopeQuery,
  useGetLowestScopeQuery,
  useGetTypeSuspaseQuery,
  useGetGraphScopeQuery,
  useGetNonIdealAgeQuery,
  useGetIdealAgeQuery,
  useGetGraphImmunizationAgeQuery,
  useGetAverageGenderQuery,
  useGetMostImmunizationTypeMaleQuery,
  useGetMostImmunizationTypeFemaleQuery,
  useGetGraphImmunizationGenderQuery,

  //
  useGetTotalImmunizationByVaccineTypeQuery,
  useGetDoPercentageDPHTHBHIBQuery,
  useGetDoPercentageCampakRubelaQuery,
  useGetTotalScopeQuery,
  useGetTotalHighestScopeQuery,
  useGetTotalLowestScopeQuery,
  useGetPercentageTotalImmunizationQuery,
  useGetAverageBayiImmunizationByGenderQuery,
  useGetExceedTargetPerVaccineQuery,
  useGetHighestImmunizationByAgeQuery,
  useGetImmunizationBayiWithHighetFemaleRecivientQuery,
  useGetImmunizationBayiWithHighetMaleRecivientQuery,
  useGetInExceedTargetPerVaccineQuery,
  useGetMaxImmunizationByAgeQuery,
  useGetScopePercentagePerMonthQuery,
  useGetSummaryBayiImmunizationByAgeQuery,
  useGetSummaryBayiImmunizationPerGenderQuery,
  useGetSummaryImmunizationPerVaccineQuery,
  useGetSummaryScopePercentageQuery,
  useGetTotalHighestScopeByVaccineTypeQuery,
  useGetTotalLowestScopeByVaccineTypeQuery,
  useGetTotalScopeByVaccineTypeQuery,
  useGetListFaskesQuery
} = babyImmunizationApi;
