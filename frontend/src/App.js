import './App.css';

import Homepage from './pages/homepage'
import TestPage from './pages/test-page';

import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/"> <Homepage className="Homepage"/> </Route>
      <Route exact path="/test"> <TestPage className="Homepage"/> </Route>
    </BrowserRouter>
  );
}

export default App;
