import { EndpointBuilder } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface RefreshResponse {
  refreshToken: {
    new_token: string;
    new_refresh_token: string;
    user: User;
  };
}

export const refreshTokenEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  refreshToken: builder.mutation<RefreshResponse, void>({
    query: () => ({
      url: '',
      method: 'POST',
      body: {
        query: `
          mutation {
            refreshToken {
              new_token
              new_refresh_token
              user {
                id
                username
                email
              }
            }
          }
        `,
      },
    }),
    transformResponse: (response: { data?: { refreshToken?: RefreshResponse } }) => {
      if (!response.data?.refreshToken) {
        throw new Error('Invalid response structure');
      }
      return response.data.refreshToken;
    },
  }),
});
