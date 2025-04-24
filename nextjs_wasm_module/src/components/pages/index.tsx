import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/config/store';
import { allErrors, allStatusResolvedTo, anyStatusResolvedTo } from '@/modules/common/misc-utils';
import { initWasm, selectInitError, selectWasmInitState, selectWasmInitStatus } from '@/modules/wasm';
import { CustomError } from '@/types/error';
import { RequestStatus } from '@/types/request-status';

import { Camera } from '../camera/camera';

export const Index = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initWasm());
    }, [dispatch]);
    const initWasmStatus = useAppSelector(selectWasmInitStatus);
    const initError = useAppSelector(selectInitError);
    const initWasmState = useAppSelector(selectWasmInitState);

    const statuses: RequestStatus[] = [initWasmStatus];
    const errors: CustomError[] = initError ? [initError] : [];

    return (
        <div>
            {anyStatusResolvedTo(statuses, RequestStatus.LOADING) && <p>Loading posts ...</p>}
            {anyStatusResolvedTo(statuses, RequestStatus.FAILED) && (
                <>
                    {allErrors(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </>
            )}
            {allStatusResolvedTo(statuses, RequestStatus.COMPLETED) && (
                <>
                    <p>WASM Module loaded!</p>
                    <p>WASM module is supported: {initWasmState.support ? 'Yes' : 'No'}</p>
                    {initWasmState.message && <p>{initWasmState.message}</p>}

                    <Camera />
                </>
            )}
        </div>
    );
};
