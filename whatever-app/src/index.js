import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Route, BrowserRouter as Router} from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import {Provider} from "react-redux";
import App from './App';
import theme from './theme';
import { CookiesProvider } from 'react-cookie';
import createAppStore from "./core/store";

const store = createAppStore();

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                { /* Tell the Router to use our enhanced history */ }
                <Router>
                    <Route path="/" component={App} />
                </Router>
            </ThemeProvider>
        </Provider>
    </CookiesProvider>,
    document.querySelector('#root'),
);
