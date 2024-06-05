import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState, AppDispatch } from '../../store';
import { clearAuth } from '../authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/graphql/',
  credentials: 'include', // 确保 cookies 在每次请求中被发送
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    // Token 过期或无效，清除用户信息并登出
    const dispatch = api.dispatch as AppDispatch;
    dispatch(clearAuth());
  }

  return result;
};
