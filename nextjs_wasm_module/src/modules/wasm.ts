import { RootState, useAppDispatch } from '@/config/store';
import { CustomError } from '@/types/error';
import { RequestStatus } from '@/types/request-status';
import { FaceValidationStatusCodes, apiUrlProps } from '@/types/wasm';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

// WASM loadPrivIdModule
export type WasmInitDto = {
    api_url: apiUrlProps;
    api_key?: string;
    api_orchestration_url?: string;
    cache_config?: boolean;
    timeout?: number;
    useCdn?: boolean;
};

export type WasmInitResponse = {
    support: boolean;
    message?: string;
};

// WASM isValid
export type WasmIsValidDto = {
    callback: (result: any) => void;
    config?: {
        input_image_format: string;
    };
};

export type WasmIsValidResponse = {
    antispoof_status: boolean;
    call_status: number;
    face_detected: boolean;
    face_validation_status: number | undefined;
};

export interface WasmOutput {
    init(dto: WasmInitDto): Promise<WasmInitResponse>;
    isValidWasmApi(dto: WasmIsValidDto): Promise<WasmIsValidResponse>;
}

export interface WasmState {
    isSupported: {
        support: boolean;
        message?: string;
    };
    initError: CustomError | null;
    initStatus: RequestStatus;

    faceValidationStatus?: number;
    isValidStatus: RequestStatus;
    isValidError: CustomError | null;
}

export enum WasmCallTypes {
    INIT = 'initStatus',
    IS_VALID = 'isValidStatus'
}

export const wasmReducers = {
    startCall: (state: WasmState, { payload }: PayloadAction<{ callType: WasmCallTypes }>) => {
        state[payload.callType] = RequestStatus.LOADING;
    },
    init: (state: WasmState, { payload }: PayloadAction<WasmInitResponse>) => {
        // TODO: Handle error
        state.isSupported = payload;
        state.initStatus = RequestStatus.COMPLETED;
    },
    isValid: (state: WasmState, { payload }: PayloadAction<WasmIsValidResponse>) => {
        state.faceValidationStatus = payload.face_validation_status
            ? FaceValidationStatusCodes[payload.face_validation_status]
            : undefined;
        state.isValidStatus = RequestStatus.COMPLETED;
    }
};

export const wasmSlice = createSlice({
    name: 'wasm',
    initialState: {
        isSupported: {
            support: false,
            message: ''
        },
        initError: null,
        initStatus: RequestStatus.IDLE,

        faceValidationStatus: undefined,
        isValidStatus: RequestStatus.IDLE,
        isValidError: null
    } as WasmState,
    reducers: wasmReducers
});

export const createApiUrlConfig = (apiUrl: string): apiUrlProps => {
    return {
        collections: {
            default: {
                named_urls: {
                    base_url: `${apiUrl}/node`,
                    enroll: `${apiUrl}/node/FACE3_2/enroll`,
                    predict: `${apiUrl}/node/FACE3_2/predict`
                }
            }
        }
    };
};

// Actions
const { actions } = wasmSlice;
export const initWasm =
    () =>
    async (dispatch: any, _: any, { wasmOutput }: { wasmOutput: WasmOutput }) => {
        dispatch(actions.startCall({ callType: WasmCallTypes.INIT }));

        const apiKey = process.env.NEXT_PUBLIC_PRIVATEID_API_KEY;
        const apiUrl = process.env.NEXT_PUBLIC_PRIVATEID_API_URL || 'https://api.prodv3.cryptonets.ai';

        const { support, message } = await wasmOutput.init({
            api_url: createApiUrlConfig(apiUrl),
            api_key: apiKey
        });

        dispatch(actions.init({ support, message }));
    };

export const getIsValid =
    () =>
    async (dispatch: any, _: any, { wasmOutput }: { wasmOutput: WasmOutput }) => {
        dispatch(actions.startCall({ callType: WasmCallTypes.IS_VALID }));
        await wasmOutput.isValidWasmApi({
            callback: (result: any) => {
                dispatch(actions.isValid(result));
            },
            config: {
                input_image_format: 'rgba'
            }
        });
    };

export class WasmApi implements WasmOutput {
    async init(dto: WasmInitDto): Promise<{ support: boolean; message?: string }> {
        const { loadPrivIdModule } = await import('@privateid/cryptonets-web-sdk-alpha');

        return loadPrivIdModule(dto);
    }

    async isValidWasmApi(dto: WasmIsValidDto): Promise<any> {
        const { isValid } = await import('@privateid/cryptonets-web-sdk-alpha');

        return await isValid(dto);
    }
}

// Selectors
export const selectWasmInitStatus = (state: RootState) => state.wasm.initStatus;
export const selectWasmInitState = (state: RootState) => state.wasm.isSupported;
export const selectInitError = (state: RootState): CustomError | null => state.wasm.initError;
export const selectIsWasmSupported = (state: RootState) => state.wasm.isSupported.support;

export const selectIsValidStatus = (state: RootState) => state.wasm.isValidStatus;
export const selectIsValidError = (state: RootState): CustomError | null => state.wasm.isValidError;
export const selectFaceValidationStatus = (state: RootState) => state.wasm.faceValidationStatus;
