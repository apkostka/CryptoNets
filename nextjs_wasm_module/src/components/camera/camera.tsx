import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/config/store';
import { allErrors, allStatusResolvedTo, anyStatusResolvedTo } from '@/modules/common/misc-utils';
import { getIsValid, selectFaceValidationStatus, selectIsValidError, selectIsValidStatus } from '@/modules/wasm';
import { CustomError } from '@/types/error';
import { RequestStatus } from '@/types/request-status';

// Import the actions object from the appropriate module

export const Camera = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            // Import within useEffect to ensure the module is loaded only on the client side,
            // as the WASM module uses `Worker`
            const { openCamera } = await import('@privateid/cryptonets-web-sdk-alpha');
            // TODO: Send video element ID to global state
            const {
                devices = [],
                faceMode,
                settings,
                status,
                stream,
                errorMessage,
                capabilities
            } = await openCamera({
                videoElementId: 'userVideo',
                canvasResolution: {
                    width: 400,
                    height: 400
                }
            });
            console.log(devices);
            if (devices && devices.length > 0) {
                await dispatch(getIsValid());
            }
        })();
    }, []);

    const isValidStatus = useAppSelector(selectIsValidStatus);
    const isValidError = useAppSelector(selectIsValidError);
    const faceValidationStatus = useAppSelector(selectFaceValidationStatus);

    const statuses: RequestStatus[] = [isValidStatus];
    const errors: CustomError[] = isValidError ? [isValidError] : [];
    console.log(statuses, errors);

    return (
        <form>
            <div className='mb-3'>
                <p>Face Validation: {`${faceValidationStatus}`}</p>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(getIsValid());
                    }}
                    className='ml-3 cursor-pointer rounded border'>
                    Validate
                </button>
            </div>
            <div>
                <video id='userVideo' muted autoPlay className=''></video>
            </div>
        </form>
    );
};
