import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { wusImmunizationApi } from "../services/wus";

export interface WusState {
  getTotalImmunization?: any;
  getTotalImmunizationPregnant?: any;
  getTotalImmunizationFertile?: any;
  getTotalImmunizationTdWus?: any;
  getTotalImmunizationTdWusPregnant?: any;

  getTotalImmunizationTdWusFertile?: any;

  getTotalImmunizationTotalCoverage?: any;

  getTotalImmunizationTotalCoverageHighest?: any;

  getTotalImmunizationTotalCoverageLowest?: any;

  getTotalImmunizationTotalCumulativeCoverage?: any;

  getTotalImmunizationTotalCumulativeCoverageRecipients?: any;

  getDistributionStatusChart?: any;

  getDistributionStatusPregnantChart?: any;
}

interface UpdateFieldPayload {
  fieldName: keyof WusState;
  fieldValue: any;
}

const initialState: WusState = {};

export const WusSlice = createSlice({
  name: "wus",
  initialState,
  reducers: {
    handleChangeWus: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName] = fieldValue;
    },
    resetStateWus: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        wusImmunizationApi.endpoints.getTotalImmunization.matchFulfilled,
        (state, { payload }) => {
          state.getTotalImmunization = payload;
        }
      )
      .addMatcher(
        wusImmunizationApi.endpoints.getTotalImmunizationPregnant
          .matchFulfilled,
        (state, { payload }) => {
          state.getTotalImmunizationPregnant = payload;
        }
      )
      .addMatcher(
        wusImmunizationApi.endpoints.getTotalImmunizationTdWus.matchFulfilled,
        (state, { payload }) => {
          state.getTotalImmunizationTdWus = payload;
        }
      )
      .addMatcher(
        wusImmunizationApi.endpoints.getTotalImmunizationTdWusPregnant
          .matchFulfilled,
        (state, { payload }) => {
          state.getTotalImmunizationTdWusPregnant = payload;
        }
      )
      .addMatcher(
        wusImmunizationApi.endpoints.getTotalImmunizationTdWusFertile
          .matchFulfilled,
        (state, { payload }) => {
          state.getTotalImmunizationTdWusFertile = payload;
        }
      )
      .addMatcher(
        wusImmunizationApi.endpoints.getTotalImmunizationTotalCoverage
          .matchFulfilled,
        (state, { payload }) => {
          state.getTotalImmunizationTotalCoverage = payload;
        }
      )
      .addMatcher(
        wusImmunizationApi.endpoints.getTotalImmunizationTotalCoverageHighest
          .matchFulfilled,
        (state, { payload }) => {
          state.getTotalImmunizationTotalCoverageHighest = payload;
        }
      )
      .addMatcher(
        wusImmunizationApi.endpoints.getTotalImmunizationTotalCoverageLowest
          .matchFulfilled,
        (state, { payload }) => {
          state.getTotalImmunizationTotalCoverageLowest = payload;
        }
      )
      .addMatcher(
        wusImmunizationApi.endpoints.getTotalImmunizationTotalCumulativeCoverage
          .matchFulfilled,
        (state, { payload }) => {
          state.getTotalImmunizationTotalCumulativeCoverage = payload;
        }
      )
      .addMatcher(
        wusImmunizationApi.endpoints
          .getTotalImmunizationTotalCumulativeCoverageRecipients.matchFulfilled,
        (state, { payload }) => {
          state.getTotalImmunizationTotalCumulativeCoverageRecipients = payload;
        }
      )
      .addMatcher(
        wusImmunizationApi.endpoints.getDistributionStatusChart.matchFulfilled,
        (state, { payload }) => {
          state.getDistributionStatusChart = payload;
        }
      )
      .addMatcher(
        wusImmunizationApi.endpoints.getDistributionStatusPregnantChart
          .matchFulfilled,
        (state, { payload }) => {
          state.getDistributionStatusPregnantChart = payload;
        }
      );
  },
});

export const { handleChangeWus, resetStateWus } = WusSlice.actions;

export default WusSlice.reducer;
