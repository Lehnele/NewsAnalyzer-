import { createReducer } from "@reduxjs/toolkit";
import {
  fetchAnalyzeSettingsPWStart,
  fetchAnalyzeSettingsPWSuccess,
  fetchAnalyzeSettingsPWError,
  insertHistorySettingsPW,
}
  from "../actions/actions";

const initialState = {
  loading: false,
  cancel: false,
  chartSettings: {}
}

export default createReducer(initialState, {
  [fetchAnalyzeSettingsPWStart]: state => {
    state.loading = true
    state.cancel = true
  },
  [fetchAnalyzeSettingsPWSuccess]: (state, action) => {
    state.chartSettings = action.payload
    state.loading = false
  },
  [fetchAnalyzeSettingsPWError]: state => {
    state.loading = false
  },
  [insertHistorySettingsPW]: (state,action) => {
    state.chartSettings = action.payload.Response
  }
})