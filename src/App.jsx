import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from 'Pages/Home';
import Login from 'Pages/Login';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default App;
