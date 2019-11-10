import React from 'react';
import Box from '@material-ui/core/Box';
import {Route, Switch} from "react-router-dom";
import Sample from "./component/Sample";
import SignIn from "./component/SignIn";
import StartPage from "./component/StartPage";

export default function App() {
  return (
    <main>
        <Switch>
            <Route path="/" exact component={Sample} />
            <Route path="/login" component={StartPage} />
            <Route path="/" component={Sample} />
        </Switch>
    </main>
  );
}
