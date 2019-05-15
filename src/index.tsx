import './index.css';

import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppRouter } from './router';

const App = () => {
    return (
        <Router>
            <div className="content">
                <AppRouter />
            </div>
        </Router>
    );
};

const appElement = document.getElementById('app') as HTMLElement;

render(
    <App/>,
    appElement,
);