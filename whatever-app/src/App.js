import React from 'react';
import Box from '@material-ui/core/Box';
import {Route, Switch} from "react-router-dom";
import Sample from "./component/Sample";
import SignIn from "./component/SignIn";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import MainPage from "./component/MainPage";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Whatever.inc
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function App(props) {
  return (
    <main>
        <Switch>
            <Route path="/" exact component={() => <MainPage cookies={props.cookies} />} />
            <Route path="/login" component={() => <SignIn cookies={props.cookies} />} />
            <Route path="/" component={Sample} />
        </Switch>
        <Box mt={8}>
            <Copyright />
        </Box>
    </main>
  );
}
