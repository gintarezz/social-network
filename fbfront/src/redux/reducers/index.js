import { combineReducers } from "redux";

import auth from './auth';
import postReducer from './postReducer';
import commentReducer from './commentReducer';


export default combineReducers({
    auth,
   posts: postReducer,
   comments: commentReducer
})