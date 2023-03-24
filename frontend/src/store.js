import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./Redux/user/user.reducer";
import { persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user : userReducer,
  profile : profileReducer,
  forgotPassword : forgotPasswordReducer,
  userDetails: userDetailsReducer,
});

const persistConfig = {
  key : 'persist-user',
  storage : storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

let initialState = {};

const middleware = [thunk];

const store = legacy_createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
export default store
