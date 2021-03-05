import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { authReducer } from "../reducers/AuthReducer";
import thunk from 'redux-thunk';
import { uiReducer } from "../reducers/UiReducer";
import { notesReducer } from "../reducers/NotesReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

export const store = createStore(
    reducers, 
    composeEnhancers(applyMiddleware(thunk))
);
