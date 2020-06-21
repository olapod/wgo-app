import React from 'react';
import { observer, Provider } from 'mobx-react';
import appStore from './stores/AppStore';
import { Switch, Route } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import MainLayout from './components/layout/MainLayout';
import Home from './components/pages/HomePage';
import Admin from './components/pages/AdminPage';
import NotFound from './components/pages/NotFoundPage';
import Login from './components/pages/LoginPage';
import Logout from './components/pages/LogoutPage';
import OneRecordPage from './components/pages/OneRecordPage';
import DifferencePage from './components/pages/DifferencePage';
import DGOstatusPage from './components/pages/DGOstatusPage';
import WithAuth from './components/pages/WithAuth';
// import history from './history';



@observer
class App extends React.Component {
  render() {
    return (
      <Provider 
        appStore={appStore}
        adminStore={appStore.adminStore}
        homePageStore={appStore.homePageStore}
        paginationStore={appStore.paginationStore}
        >
          {/* <Router history={history}> */}
        <MainLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={WithAuth(Admin)} />
            <Route path="/login" component={Login} />
            <Route path="/logout"component={Logout} />
            <Route path='/raport/:street/:number'component={OneRecordPage} />
            <Route path='/raport2/difference/:diff/range/:startAt/:limit' component={DifferencePage} />
            {/* <Route path='/raport2/differences/:diff' exact component={DifferencePage} /> */}
            <Route path='/raport3/status/:status' exact component={DGOstatusPage} />
            <Route component={NotFound} />
          </Switch>
        </MainLayout>
        {/* </Router> */}
      </Provider>
    );
  }
}

export default App;

