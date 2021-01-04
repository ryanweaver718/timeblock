import { combineReducers } from 'redux';
import items from './items/itemsReducer';

const rootReducer = combineReducers({
  items,
});

export default rootReducer;
