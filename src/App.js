import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './components/login/login';
import PrivateRoute from './components/privateRoute';
import Home from './components/home/home';
import Question from './components/question/question';
import Results from './components/results/results';
import Newquestion from './components/newquestion/newquestion';
import Leaderboard from './components/leaderboard/leaderboard';

function App() {
  return (
    <Router>
      <div>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" exact component={Home}/>
        <PrivateRoute path ="/question/:qId" component={Question}/>
        <PrivateRoute  path ="/:qId/results" component={Results}/>
        <PrivateRoute path ="/add" component={Newquestion}/>
        <PrivateRoute path ="/leaderboard" component={Leaderboard}/>
      </div>
    </Router>
  );
}

export default App;
