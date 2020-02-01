import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
// import routes
import Home from './components/pages/HomePage';
import Admin from './components/pages/AdminPage';
import NotFound from './components/pages/NotFoundPage';
import Login from './components/pages/LoginPage';
import WithAuth from './components/pages/WithAuth';

class App extends React.Component {
  render() {
    return (
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" exact component={WithAuth(Admin)} />
          <Route path="/login" exact component={Login} />
          <Route component={NotFound} />
        </Switch>
      </MainLayout>
    );
  }
}
export default App;

