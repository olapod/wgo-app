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
import Database from './components/pages/DatabasePage';
import WithAuth from './components/pages/WithAuth';
// import NavbarWithRouter from './components/features/NavBar'
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
        {/* <NavbarWithRouter/> */}
          <Switch>
            
            <Route exact path="/" component={Home} />
            <Route exact path="/database/range/:startAt/:limit" component={Database} />
            <Route exact path="/admin" component={WithAuth(Admin)} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout"component={Logout} />
            <Route exact path='/raport1/address/:street/:number'component={OneRecordPage} />
            <Route exact path='/raport2/difference/:diff/range/:startAt/:limit' component={DifferencePage} />
            {/* <Route path='/raport2/differences/:diff' exact component={DifferencePage} /> */}
            <Route path='/raport3/status/:status/range/:startAt/:limit' exact component={DGOstatusPage} />
            <Route component={NotFound} />
          </Switch>
        </MainLayout>
        {/* </Router> */}
      </Provider>
    );
  }
}

export default App;

