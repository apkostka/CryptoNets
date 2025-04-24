import React from 'react';

import NextHead from 'next/head';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NextHead>
                <title>PrivateID Demo App</title>
            </NextHead>
            {children}
        </>
    );
}
