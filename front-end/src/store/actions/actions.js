import {createAction} from "@reduxjs/toolkit";

export const fetchAnalyzeSettingsPWStart = createAction('FETCH_ANALYZE_SETTINGS_PW_START')
export const fetchAnalyzeSettingsPWSuccess = createAction('FETCH_ANALYZE_SETTINGS_PW_SUCCESS')
export const fetchAnalyzeSettingsPWError = createAction('FETCH_ANALYZE_SETTINGS_PW_ERROR')

export const fetchAnalyzeSettingsAnStart = createAction('FETCH_ANALYZE_SETTINGS_AN_START')
export const fetchAnalyzeSettingsAnSuccess = createAction('FETCH_ANALYZE_SETTINGS_AN_SUCCESS')
export const fetchAnalyzeSettingsAnError = createAction('FETCH_ANALYZE_SETTINGS_AN_ERROR')

export const fetchAnalyzeSettingsAnCStart = createAction('FETCH_ANALYZE_SETTINGS_AN_C_START')
export const fetchAnalyzeSettingsAnCSuccess = createAction('FETCH_ANALYZE_SETTINGS_AN_C_SUCCESS')
export const fetchAnalyzeSettingsAnCError = createAction('FETCH_ANALYZE_SETTINGS_AN_C_ERROR')

export const fetchCategoriesListStart = createAction('FETCH_CATEGORIES_LIST-START')
export const fetchCategoriesListSuccess = createAction('FETCH_CATEGORIES_LIST_SUCCESS')

export const getSearchHistorySuccess = createAction('GET_SEARCH_HISTORY_SUCCESS')

export const insertHistorySettingsPW = createAction('INSERT_HISTORY_SETTINGS_PW')
export const insertHistorySettingsAn = createAction('INSERT_HISTORY_SETTINGS_AN')
export const insertHistorySettingsAnC = createAction('INSERT_HISTORY_SETTINGS_AN_C')