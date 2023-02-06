import { combineReducers } from "redux";
import { feedbackReducer } from "../modules/feedback/reducer";

const allReducers = {
    feedback: feedbackReducer,
}
export const createReducers = () => {
    const appReducers = combineReducers({ ...allReducers });
    return appReducers;
}