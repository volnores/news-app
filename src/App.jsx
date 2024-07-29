import React from 'react';
import Header from './components/Header/Header';
import Main from './pages/Main';

const App = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Main />
      </div>
    </div>
  );
};

export default App;
