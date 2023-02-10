import 'modern-css-reset';

import React, { FC } from 'react';
import { AppProps } from 'next/app';

import './_app.scss';

const App: FC<AppProps> = ({ Component, pageProps, router }) => (
  <Component {...pageProps} />
);

export default App;
