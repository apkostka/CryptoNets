import { WasmApi, WasmOutput } from '@/modules/wasm';

export type AppOutputs = {
    wasmOutput: WasmOutput;
};

export const appOutputs: AppOutputs = {
    wasmOutput: new WasmApi()
};
