import React from 'react';

import setAuthToken from '../src/utils/setAuthToken';
import Routes from './components/routing/Routes';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return <Routes />;
};

export default App;
