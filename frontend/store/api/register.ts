import { EndpointBuilder } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface RegisterResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export const registerEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  register: builder.mutation<RegisterResponse, { userName: string; password: string; email: string }>({
    query: ({ userName, password, email }) => ({
      url: 'http://localhost:8000/graphql/', // 确保 URL 是正确的
      method: 'POST',
      body: {
        query: `
          mutation {
            createUser(username: "${userName}", password: "${password}", email: "${email}") {
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
    transformResponse: (response: { data?: { createUser?: { token: string; refreshToken: string; user: User } } }) => {
      if (!response.data?.createUser) {
        throw new Error('Invalid response structure');
      }
      return response.data.createUser;
    },
  }),
});
