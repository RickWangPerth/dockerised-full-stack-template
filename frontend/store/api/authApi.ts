import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { loginEndpoints } from './login';
import { registerEndpoints } from './register';
import { refreshTokenEndpoints } from './refreshToken';
import { getAuthDataEndpoints } from './getAuthData';
import { logoutEndpoints } from './logout';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    ...loginEndpoints(builder),
    ...registerEndpoints(builder),
    ...refreshTokenEndpoints(builder),
    ...getAuthDataEndpoints(builder),
    ...logoutEndpoints(builder),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useRefreshTokenMutation, 
  useGetAuthDataQuery, 
  useLogoutMutation 
} = authApi;
