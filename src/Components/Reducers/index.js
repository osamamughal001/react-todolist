import {combineReducers} from 'redux';
import todolistReducer from './todolistReducer';

const rootReducer = combineReducers({todolistReducer});

export default rootReducer;

