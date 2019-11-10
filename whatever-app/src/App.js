import React from 'react';
import Box from '@material-ui/core/Box';
import {Route, Switch} from "react-router-dom";
import Sample from "./component/Sample";
import SignIn from "./component/SignIn";

export default function App() {
  return (
    <main>
      <Box my={4}>
          <Switch>
              <Route path="/" exact component={Sample} />
              <Route path="/login" component={SignIn} />
              <Route path="/" component={Sample} />
          </Switch>
      </Box>
    </main>
  );
}
