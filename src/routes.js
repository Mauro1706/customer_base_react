import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Deshboard from './pages/components/dashboard';
import CreateClient from './pages/client/create';
import ListClient from './pages/client/list';
import DetailersClient from './pages/client/detailer';
import UpdateClient from './pages/client/update';

import ListContractStatus from './pages/contractStatus/list';
import CreateContractStatus from './pages/contractStatus/create';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Deshboard} />
            <Route exact path="/novo" component={CreateClient} />
            <Route exact path="/list" component={ListClient} />
            <Route exact path="/view/:id" component={DetailersClient} />
            <Route exact path="/update/:id" component={UpdateClient} />
            <Route exact path="/contract/status/list" component={ListContractStatus} />
            <Route exact path="/contract/status/novo" component={CreateContractStatus} />
        </Switch>
    </BrowserRouter>
)

export default Routes;