// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { wrapper, persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...props.pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
