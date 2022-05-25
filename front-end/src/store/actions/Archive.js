import axios from "../../axios/axios";
import {
    getSearchHistorySuccess,
    insertHistorySettingsPW,
    insertHistorySettingsAn,
    insertHistorySettingsAnC
} from "./actions";

export const setSessionCookie = () => {
    return async () => {
        try {
            const response = await axios.get('set-session-cookie', {
                withCredentials: true,
                'headers': {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }
}

export const getSearchHistory = () => {
    return async dispatch => {
        try {
            const response = await axios.get('get_search_history', {
                withCredentials: true,
                'headers': {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            dispatch(getSearchHistorySuccess(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const insertHistorySettings = historyItem => {
    return dispatch => {
        if (historyItem.AnalyzeType == 'TOP_WORDS') {
            dispatch(insertHistorySettingsPW(historyItem))
        } else if (historyItem.AnalyzeType == 'ACTIVITY') {
            dispatch(insertHistorySettingsAn(historyItem))
        } else if (historyItem.AnalyzeType == 'ACTIVITY_BY_CATEGORY') {
            dispatch(insertHistorySettingsAnC(historyItem))
        }
    }
}