import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { badutaImmunizationApi } from "@/lib/services/baduta-immunization";

export interface BadutaImmunizationState {
  getTotalBadutaImmunizationRecipients?: any;
  getDropoutDPTPercentage?: any;
  getDropoutRubelaPercentage?: any;
  getScopeBadutaImmunization?: any;
  getScopeDPTImmunization?: any;
  getScopeRubelaImmunization?: any;
  getScopePCVImmunization?: any;
  getTotalScope?: any;
  getTotalHighestScope?: any;
  getTotalLowestScope?: any;
  getPercentageTotalImmunization?: any;
  getScopePercentagePerMonth?: any;
  getSummaryScopePercentage?: any;
  getTotalScopeByVaccineType?: any;
  getTotalHighestScopeByVaccineType?: any;
  getTotalLowestScopeByVaccineType?: any;
  getSurpaseTargetPerVaccine?: any;
  getSummaryImmunizationPerVaccine?: any;
  getMaxImmunizationByAge?: any;
  getHighestImmunizationByAge?: any;
  getSummaryImmunizationByAge?: any;
  getAverageImmunizationByGender?: any;
  getImmunizationWithHighetMaleRecivient?: any;
  getImmunizationWithHighetFemaleRecivient?: any;
  getSummaryImmunizationPerGender?: any;
}

interface UpdateFieldPayload {
  fieldName: keyof BadutaImmunizationState;
  fieldValue: any;
}

const initialState: BadutaImmunizationState = {};

export const BadutaImmunizationSlice = createSlice({
  name: "badutaImmunization",
  initialState,
  reducers: {
    handleChangeBadutaImmunization: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName] = fieldValue;
    },
    resetStateBadutaImmunization: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(badutaImmunizationApi.endpoints.getTotalBadutaImmunizationRecipients.matchFulfilled, (state, { payload }) => {
        state.getTotalBadutaImmunizationRecipients = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getDropoutDPTPercentage.matchFulfilled, (state, { payload }) => {
        state.getDropoutDPTPercentage = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getDropoutRubelaPercentage.matchFulfilled, (state, { payload }) => {
        state.getDropoutRubelaPercentage = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getScopeBadutaImmunization.matchFulfilled, (state, { payload }) => {
        state.getScopeBadutaImmunization = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getScopeDPTImmunization.matchFulfilled, (state, { payload }) => {
        state.getScopeDPTImmunization = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getScopeRubelaImmunization.matchFulfilled, (state, { payload }) => {
        state.getScopeRubelaImmunization = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getScopePCVImmunization.matchFulfilled, (state, { payload }) => {
        state.getScopePCVImmunization = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getTotalScope.matchFulfilled, (state, { payload }) => {
        state.getTotalScope = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getTotalHighestScope.matchFulfilled, (state, { payload }) => {
        state.getTotalHighestScope = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getTotalLowestScope.matchFulfilled, (state, { payload }) => {
        state.getTotalLowestScope = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getPercentageTotalImmunization.matchFulfilled, (state, { payload }) => {
        state.getPercentageTotalImmunization = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getScopePercentagePerMonth.matchFulfilled, (state, { payload }) => {
        state.getScopePercentagePerMonth = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getSummaryScopePercentage.matchFulfilled, (state, { payload }) => {
        state.getSummaryScopePercentage = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getTotalScopeByVaccineType.matchFulfilled, (state, { payload }) => {
        state.getTotalScopeByVaccineType = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getTotalHighestScopeByVaccineType.matchFulfilled, (state, { payload }) => {
        state.getTotalHighestScopeByVaccineType = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getTotalLowestScopeByVaccineType.matchFulfilled, (state, { payload }) => {
        state.getTotalLowestScopeByVaccineType = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getSurpaseTargetPerVaccine.matchFulfilled, (state, { payload }) => {
        state.getSurpaseTargetPerVaccine = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getSummaryImmunizationPerVaccine.matchFulfilled, (state, { payload }) => {
        state.getSummaryImmunizationPerVaccine = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getMaxImmunizationByAge.matchFulfilled, (state, { payload }) => {
        state.getMaxImmunizationByAge = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getHighestImmunizationByAge.matchFulfilled, (state, { payload }) => {
        state.getHighestImmunizationByAge = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getSummaryImmunizationByAge.matchFulfilled, (state, { payload }) => {
        state.getSummaryImmunizationByAge = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getAverageImmunizationByGender.matchFulfilled, (state, { payload }) => {
        state.getAverageImmunizationByGender = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getImmunizationWithHighetMaleRecivient.matchFulfilled, (state, { payload }) => {
        state.getImmunizationWithHighetMaleRecivient = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getImmunizationWithHighetFemaleRecivient.matchFulfilled, (state, { payload }) => {
        state.getImmunizationWithHighetFemaleRecivient = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getSummaryImmunizationPerGender.matchFulfilled, (state, { payload }) => {
        state.getSummaryImmunizationPerGender = payload
      })
  }
});

export const { handleChangeBadutaImmunization, resetStateBadutaImmunization } = BadutaImmunizationSlice.actions;

export default BadutaImmunizationSlice.reducer;
