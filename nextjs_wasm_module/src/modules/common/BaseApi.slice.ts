import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const BaseAPISlice = createApi({
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({})
});
