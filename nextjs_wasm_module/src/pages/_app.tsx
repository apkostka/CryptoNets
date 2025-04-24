import type { AppProps } from 'next/app';

import BaseLayout from '@/components/layout/base';
import { store } from '@/config/store';

import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <BaseLayout>
                <Component {...pageProps} />
            </BaseLayout>
        </Provider>
    );
}

export default MyApp;
