import React from 'react';
import Box from '@material-ui/core/Box';
import {Route, Switch} from "react-router-dom";
import Sample from "./component/Sample";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import MainPage from "./component/MainPage";
import StartPage from "./component/StartPage";
import AppBar from "@material-ui/core/AppBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import ResultPage from "./component/ResultPage";

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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function App(props) {
    const classes = useStyles();

      return (
        <main>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Whatever.inc
                    </Typography>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path="/" exact component={() => <MainPage cookies={props.cookies} />} />
                <Route path="/start" component={() => <StartPage cookies={props.cookies} />} />
                <Route path="/result" component={() => <ResultPage cookies={props.cookies} />} />
                <Route path="/" component={Sample} />
            </Switch>
            <Box mt={8}>
                <Copyright />
            </Box>
        </main>
      );
}
