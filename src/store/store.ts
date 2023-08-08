import {combineReducers, compose, createStore} from "redux";
import {appReducer} from "./reducers/appReducer";


export type AppStateType = ReturnType<typeof rootReducers>

const rootReducers = combineReducers({
    app: appReducer
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const store = createStore(rootReducers)