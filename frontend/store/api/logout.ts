import { EndpointBuilder } from '@reduxjs/toolkit/query/react';

interface LogoutResponse {
  success: boolean;
}

export const logoutEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  logout: builder.mutation<LogoutResponse, void>({
    query: () => ({
      url: 'http://localhost:8000/users/logout/',
      method: 'POST',
      credentials: 'include', // 确保 cookies 被发送
    }),
    invalidatesTags: [], // 配置为空数组，避免错误
  }),
});
