import type { NextPage } from 'next';

import PublicLayout from '@/components/layout/public';
import { Index } from '@/components/pages';

const IndexPage: NextPage = () => {
    return (
        <PublicLayout>
            <Index />
        </PublicLayout>
    );
};

export default IndexPage;
