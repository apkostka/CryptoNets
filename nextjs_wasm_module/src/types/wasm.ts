export interface apiUrlProps {
    collections: {
        default: {
            named_urls: {
                base_url: string;
                predict?: string;
                enroll?: string;
                validate_api_key?: string;
            };
        };
        collection1?: {
            named_urls?: {
                predict?: string;
                enroll?: string;
                validate_api_ket?: string;
                delete?: string;
            };
        };
        collection2?: {
            named_urls?: {
                predict?: string;
                enroll?: string;
                validate_api_ket?: string;
                delete?: string;
            };
        };
    };
}

export const FaceValidationStatusCodes: any = {
    '-100': 'Internal error',
    '-1': 'Invalid image',
    '0': 'Valid face',
    '1': 'Image spoof',
    '2': 'Video spoof',
    '3': 'Too close',
    '4': 'Too far',
    '5': 'Close to right edge',
    '6': 'Close to left edge',
    '7': 'Close to top edge',
    '8': 'Close to bottom edge',
    '9': 'Too blurry',
    '10': 'Eye glasses detected',
    '11': 'Facemask detected',
    '12': 'Chin too far left',
    '13': 'Chin too far right',
    '14': 'Chin too far up',
    '15': 'Chin too far down',
    '16': 'Image too dim',
    '17': 'Image too bright',
    '18': 'Face low confidence value',
    '19': 'Invalid face background',
    '20': 'Eyes closed',
    '21': 'Mouth open',
    '22': 'Face tilted right',
    '23': 'Face tilted left',
};
