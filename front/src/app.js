import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import Title from './component/title';

import List from './page/list';
import Detail from './page/detail';
import { inject } from 'mobx-react';
import socket from './service/socket';

@inject('file')
export default class App extends React.Component {
    componentDidMount() {
        this.props.file.fetchFiles();
    }    

    render() {
        return (
            <div style={{ width: 960, margin: '0 auto' }}>
                <Title />
                <Switch>
                    <Route exact path="/" component={ () => <Detail type="create" /> } />
                    <Route path="/files/:id" component={ Detail } />
                    <Route path="/files" component={ List } />
                </Switch>
            </div>
        )
    }
}