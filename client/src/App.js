import React from 'react';
import { observer, Provider } from 'mobx-react';
import appStore from './stores/AppStore';
import { Switch, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
// import routes
import Home from './components/pages/HomePage';
import Admin from './components/pages/AdminPage';
import NotFound from './components/pages/NotFoundPage';
import Login from './components/pages/LoginPage';
import Logout from './components/pages/LogoutPage';
import OneRecordPage from './components/pages/OneRecordPage';
import DifferencePage from './components/pages/DifferencePage';
import DGOstatusPage from './components/pages/DGOstatusPage';
import WithAuth from './components/pages/WithAuth';

@observer
class App extends React.Component {
  render() {
    return (
      <Provider appStore={appStore}>
        <MainLayout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/admin" exact component={WithAuth(Admin)} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path='/raport/:street/:number' exact component={OneRecordPage} />
            <Route path='/raport2/difference/:diff' exact component={DifferencePage} />
            {/* <Route path='/raport2/differences/:diff' exact component={DifferencePage} /> */}
            <Route path='/raport3/status/:status' exact component={DGOstatusPage} />
            <Route component={NotFound} />
          </Switch>
        </MainLayout>
      </Provider>
    );
  }
}

export default App;

