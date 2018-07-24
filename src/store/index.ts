
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/es/storage";
import {createStore} from "redux";
import reducers from "./reducers";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor }
