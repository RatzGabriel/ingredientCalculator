import reducer from './recipes';
import { configureStore } from '@reduxjs/toolkit';

export default function configAppStore() {
  return configureStore({
    reducer,
  });
}

const store=configAppStore()

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch=typeof store.dispatch;