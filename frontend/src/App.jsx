import React from 'react';

import Routes from './routes';
import { AuthProvider } from './hooks/auth';

const App = () => (
  <div className="App">
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </div>
);

export default App;
