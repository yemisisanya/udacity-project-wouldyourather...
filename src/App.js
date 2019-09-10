import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/login/login';
import PrivateRoute from './components/privateRoute';
import Home from './components/home/home';
import Question from './components/question/question';
import Results from './components/results/results';
import Newquestion from './components/newquestion/newquestion';
import Leaderboard from './components/leaderboard/leaderboard';
import Poll404Component from './components/poll404Component';


function App() {
  return (
    <Router>
      <div>
       <Switch>
        <Route path="/login"  exact component={Login} />
        <PrivateRoute path="/" exact component={Home}/>
        <PrivateRoute exact path ="/question/:qId" component={Question}/>
        <PrivateRoute exact path ="/:qId/results" component={Results}/>
        <PrivateRoute exact path ="/add" component={Newquestion}/>
        <PrivateRoute exact path ="/leaderboard" component={Leaderboard}/>
        <PrivateRoute path="*"component={Poll404Component}/>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
