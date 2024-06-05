import { EndpointBuilder } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  username: string;
  email: string;
}

export const getAuthDataEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getAuthData: builder.query<User, void>({
    query: () => ({
      url: 'http://localhost:8000/graphql/',
      method: 'POST',
      body: {
        query: `
          query {
            whoami {
              id
              username
              email
            }
          }
        `,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    transformResponse: (response: { data?: { whoami?: User } }) => {
      if (!response.data?.whoami) {
        throw new Error('Invalid response structure');
      }
      return response.data.whoami;
    },
  }),
});
