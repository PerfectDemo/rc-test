import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


import App from './src/app';
import stores from './src/store';

import { Provider } from 'mobx-react';

const root = document.getElementById('root');

ReactDom.render(
    <Provider {...stores} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  , root);