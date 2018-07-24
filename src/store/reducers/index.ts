import { combineReducers } from 'redux';
import pointReducer from "./points";

​
const reducers = combineReducers({
    points : pointReducer,
});

export default reducers;