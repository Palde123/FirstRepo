import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './taskSlice';
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from "redux-persist";
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['tasks'], 
};

const rootReducer = combineReducers({
  tasks: taskReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);