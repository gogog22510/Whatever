import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {LOGIN_SUCCESS} from "../core/constant";
import modelMaleImage from "../image/modelMale.jpg";
import modelFemaleImage from "../image/modelFemale.jpeg";
import modelLGBTQImage from "../image/modelLGBTQ.jpg";
import princeImage from "../image/prince.png";
import princessImage from "../image/princess.png";
import blindJohnImage from "../image/blindJohn.jpg";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    abc: {
        display: "flex",
    },
    imgSpace: {
        marginRight: theme.spacing(10),
    }
}));

const mapStateToProps = (state, ownProps) => {
    return {
        common: state.common,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchLoginSuccess: data => dispatch({
            type: LOGIN_SUCCESS,
            data: data
        }),
    }
};

function StartPage(props) {
    const {dispatchLoginSuccess} = props;
    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = React.useState(0);

    const navigationToMain = () => {
        dispatchLoginSuccess({
            userType: 1
        });
        history.push("/");
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <div className={classes.abc}>
                    <img className={classes.imgSpace} src={princeImage} alt="hello!" width={200} height={300} />
                    <img className={classes.imgSpace} src={princessImage} alt="hello!" width={200} height={300} />
                    <img src={blindJohnImage} alt="hello!" width={200} height={300} />
                </div>
                <form className={classes.form} noValidate>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={navigationToMain}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPage)