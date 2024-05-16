import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { babyImmunizationApi } from "@/lib/services/baby-immunization";

export interface BabyImmunizationState {
  getTotalImmunization?: any;
  getTotalImmunizationByVaccineType?: any;
  getDoPercentageDPHTHBHIB?: any;
  getDoPercentageCampakRubela?: any;
  getTotalScope?: any;
  getTotalHighestScope?: any;
  getTotalLowestScope?: any;
  getPercentageTotalImmunization?: any;
  getScopePercentagePerMonth?: any;
  getSummaryScopePercentage?: any;
  getTotalScopeByVaccineType?: any;
  getTotalHighestScopeByVaccineType?: any;
  getTotalLowestScopeByVaccineType?: any;
  getExceedTargetPerVaccine?: any;
  getInExceedTargetPerVaccine?: any;
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
  fieldName: keyof BabyImmunizationState;
  fieldValue: any;
}

const initialState: BabyImmunizationState = {};

export const BabyImmunizationSlice = createSlice({
  name: "babyImmunization",
  initialState,
  reducers: {
    handleChangeBabyImmunization: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName] = fieldValue;
    },
    resetStateBabyImmunization: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(babyImmunizationApi.endpoints.getTotalImmunization.matchFulfilled, (state, { payload }) => {
        state.getTotalImmunization = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getTotalImmunizationByVaccineType.matchFulfilled, (state, { payload }) => {
        state.getTotalImmunizationByVaccineType = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getDoPercentageDPHTHBHIB.matchFulfilled, (state, { payload }) => {
        state.getDoPercentageDPHTHBHIB = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getDoPercentageCampakRubela.matchFulfilled, (state, { payload }) => {
        state.getDoPercentageCampakRubela = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getTotalScope.matchFulfilled, (state, { payload }) => {
        state.getTotalScope = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getTotalHighestScope.matchFulfilled, (state, { payload }) => {
        state.getTotalHighestScope = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getTotalLowestScope.matchFulfilled, (state, { payload }) => {
        state.getTotalLowestScope = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getPercentageTotalImmunization.matchFulfilled, (state, { payload }) => {
        state.getPercentageTotalImmunization = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getScopePercentagePerMonth.matchFulfilled, (state, { payload }) => {
        state.getScopePercentagePerMonth = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getSummaryScopePercentage.matchFulfilled, (state, { payload }) => {
        state.getSummaryScopePercentage = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getTotalScopeByVaccineType.matchFulfilled, (state, { payload }) => {
        state.getTotalScopeByVaccineType = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getTotalHighestScopeByVaccineType.matchFulfilled, (state, { payload }) => {
        state.getTotalHighestScopeByVaccineType = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getTotalLowestScopeByVaccineType.matchFulfilled, (state, { payload }) => {
        state.getTotalLowestScopeByVaccineType = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getExceedTargetPerVaccine.matchFulfilled, (state, { payload }) => {
        state.getExceedTargetPerVaccine = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getInExceedTargetPerVaccine.matchFulfilled, (state, { payload }) => {
        state.getInExceedTargetPerVaccine = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getSummaryImmunizationPerVaccine.matchFulfilled, (state, { payload }) => {
        state.getSummaryImmunizationPerVaccine = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getMaxImmunizationByAge.matchFulfilled, (state, { payload }) => {
        state.getMaxImmunizationByAge = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getHighestImmunizationByAge.matchFulfilled, (state, { payload }) => {
        state.getHighestImmunizationByAge = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getSummaryImmunizationByAge.matchFulfilled, (state, { payload }) => {
        state.getSummaryImmunizationByAge = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getAverageImmunizationByGender.matchFulfilled, (state, { payload }) => {
        state.getAverageImmunizationByGender = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getImmunizationWithHighetMaleRecivient.matchFulfilled, (state, { payload }) => {
        state.getImmunizationWithHighetMaleRecivient = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getImmunizationWithHighetFemaleRecivient.matchFulfilled, (state, { payload }) => {
        state.getImmunizationWithHighetFemaleRecivient = payload
      })
      .addMatcher(babyImmunizationApi.endpoints.getSummaryImmunizationPerGender.matchFulfilled, (state, { payload }) => {
        state.getSummaryImmunizationPerGender = payload
      })
  }
});

export const { handleChangeBabyImmunization, resetStateBabyImmunization } = BabyImmunizationSlice.actions;

export default BabyImmunizationSlice.reducer;
