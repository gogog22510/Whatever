import React from 'react';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {CHOOSE_GENDER} from "../core/constant";
import princeImage from "../image/prince.png";
import princessImage from "../image/princess.png";
import blindJohnImage from "../image/blindJohn.jpg";
import "./StartPage.css";

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
        "&:hover": {
            cursor: "pointer"
        }
    },
}));

const mapStateToProps = (state, ownProps) => {
    return {
        common: state.common,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchChooseGenderSuccess: data => dispatch({
            type: CHOOSE_GENDER,
            data: data
        }),
    }
};

function StartPage(props) {
    const {dispatchChooseGenderSuccess} = props;
    const classes = useStyles();
    const history = useHistory();

    const navigationToWhateverPage = (gender) => () => {
        dispatchChooseGenderSuccess({
           genderType: gender
        });
        history.push("/");
    };

    return (
        <Container component="main" maxWidth="xs" className="hoverImg">
            <div className={classes.paper}>
                <div className={classes.abc}>
                    <img className={classes.imgSpace} src={princessImage} alt="hello!" width={200} height={300}
                         onClick={navigationToWhateverPage(1)}/>
                    <img className={classes.imgSpace} src={blindJohnImage} alt="hello!" width={200} height={300}
                         onClick={navigationToWhateverPage(2)}/>
                    <img className={classes.imgSpace} src={princeImage} alt="hello!" width={200} height={300}
                         onClick={navigationToWhateverPage(3)}/>
                </div>
            </div>
        </Container>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPage)