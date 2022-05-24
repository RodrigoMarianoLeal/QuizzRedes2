import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import User from './pages/User';
import EditUser from './pages/User/edit-user';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import QuizzGame from './pages/QuizzGame';

const routes = [
  {
    component: Home,
    name: 'Home',
    path: '/',
  },
  {
    component: QuizzGame,
    name: 'QuizzGame',
    path: '/quizzGame',

  },
  {
    component: User,
    name: 'User',
    path: '/user',
    visible: false,
  },
  {
    component: EditUser,
    name: 'User',
    path: '/user/:id',
    visible: false,
  },
  {
    component: Login,
    name: 'Login',
    path: '/login',
  },

  {
    component: SignUp,
    name: 'SignUp',
    path: '/signup',
  },
];

const Routes = () => (
  <BrowserRouter>
    <Navbar title="Quizz Game" routes={routes} />
    <Switch>
      {routes.map(({ path, component }) => (
        <Route exact key={path} path={path} component={component} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
