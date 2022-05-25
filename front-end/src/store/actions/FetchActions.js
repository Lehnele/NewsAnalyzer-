import axios from "../../axios/axios";

import {
  fetchAnalyzeSettingsAnCError,
  fetchAnalyzeSettingsAnCStart,
  fetchAnalyzeSettingsAnCSuccess,
  fetchAnalyzeSettingsAnError,
  fetchAnalyzeSettingsAnStart,
  fetchAnalyzeSettingsAnSuccess,
  fetchAnalyzeSettingsPWError,
  fetchAnalyzeSettingsPWStart,
  fetchAnalyzeSettingsPWSuccess,
  fetchCategoriesListStart,
  fetchCategoriesListSuccess
} from "./actions";

export const fetchAnalyzeSettings = (analyzeSettings, pass) => {
  return async dispatch => {
    if (pass == 'top-words') dispatch(fetchAnalyzeSettingsPWStart());
    if (pass == 'period-activity') dispatch(fetchAnalyzeSettingsAnStart());
    if (pass == 'category-activity') dispatch(fetchAnalyzeSettingsAnCStart());
    try {
      const response = await axios.post(pass, analyzeSettings, {
        withCredentials: true,
        'headers': {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (pass == 'top-words') dispatch(fetchAnalyzeSettingsPWSuccess(response.data));
      if (pass == 'period-activity') dispatch(fetchAnalyzeSettingsAnSuccess(response.data));
      if (pass == 'category-activity') dispatch(fetchAnalyzeSettingsAnCSuccess(response.data));
    } catch (e) {
      if (pass == 'top-words') dispatch(fetchAnalyzeSettingsPWError());
      if (pass == 'period-activity') dispatch(fetchAnalyzeSettingsAnError());
      if (pass == 'category-activity') dispatch(fetchAnalyzeSettingsAnCError());
    }
  }
}

export const fetchCategoriesList = () => {
  return async dispatch => {
    dispatch(fetchCategoriesListStart)
    const response = await axios.get('categories-list')
    dispatch(fetchCategoriesListSuccess(response.data))
  }
}


