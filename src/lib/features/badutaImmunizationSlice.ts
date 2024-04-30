import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { badutaImmunizationApi } from "@/lib/services/baduta-immunization";

export interface BadutaImmunizationState {
  getTotalImmunization?: any;
  getTotalImmunizationByVaccineType?: any;
  getDoPercentageDPHTHBHIB?: any;
  getDoPercentageCampakRubela?: any;
  getTotalScope?: any;
  getTotalHighestScope?: any;
  getTotalLowestScope?: any;
  getPercentageTotalImmunization?: any;
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
      .addMatcher(badutaImmunizationApi.endpoints.getTotalImmunization.matchFulfilled, (state, { payload }) => {
        state.getTotalImmunization = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getTotalImmunizationByVaccineType.matchFulfilled, (state, { payload }) => {
        state.getTotalImmunizationByVaccineType = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getDoPercentageDPHTHBHIB.matchFulfilled, (state, { payload }) => {
        state.getDoPercentageDPHTHBHIB = payload
      })
      .addMatcher(badutaImmunizationApi.endpoints.getDoPercentageCampakRubela.matchFulfilled, (state, { payload }) => {
        state.getDoPercentageCampakRubela = payload
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
  }
});

export const { handleChangeBadutaImmunization, resetStateBadutaImmunization } = BadutaImmunizationSlice.actions;

export default BadutaImmunizationSlice.reducer;
