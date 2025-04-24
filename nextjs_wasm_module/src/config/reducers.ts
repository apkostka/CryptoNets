import { wasmSlice } from '@/modules/wasm';
import { combineReducers } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';

export const appReducers = combineReducers({
    [wasmSlice.name]: wasmSlice.reducer
});

export const rootReducer = (state: any, action: AnyAction) => {
    return appReducers(state, action);
};
