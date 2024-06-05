import { EndpointBuilder } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export const loginEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  login: builder.mutation<LoginResponse, { userName: string; password: string }>({
    query: ({ userName, password }) => ({
      url: 'http://localhost:8000/graphql/', // 确保 URL 是正确的
      method: 'POST',
      body: {
        query: `
          mutation {
            login(username: "${userName}", password: "${password}") {
              token
              refreshToken
              user {
                id
                username
                email
              }
            }
          }
        `,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    transformResponse: (response: { data?: { login?: { token: string; refreshToken: string; user: User } } }) => {
      if (!response.data?.login) {
        throw new Error('Invalid response structure');
      }
      return response.data.login;
    },
  }),
});
