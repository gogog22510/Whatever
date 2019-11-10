import React from 'react';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {RESULT_DECISION} from "../core/constant";
import princeImage from "../image/prince.png";
import princessImage from "../image/princess.png";
import blindJohnImage from "../image/blindJohn.jpg";
import modelMaleImage from "../image/modelMale.jpg";
import modelFemaleImage from "../image/modelFemale.jpeg";
import modelLGBTQImage from "../image/modelLGBTQ.jpg";

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
    horizontalSplit: {
        display: "flex",
    },
    imgSpace: {
        marginRight: theme.spacing(10),
    },
}));

const mapStateToProps = (state, ownProps) => {
    return {
        common: state.common,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchDecisionResult: data => dispatch({
            type: RESULT_DECISION,
            data: data
        }),
    }
};

function ResultPage(props) {
    const {dispatchDecisionResult, common} = props;
    const {decision, menu} = common;
    const classes = useStyles();
    const history = useHistory();
    const prevCount = decision;

    const navigationToWhateverPage = (acceptOrNot) => () => {
        const count = prevCount + acceptOrNot;
        dispatchDecisionResult({
            decision: count
        });
        if (acceptOrNot === -0.2) {
            alert("我就隨便我驕傲");
        }
        if (acceptOrNot === 1) {
            alert("我就難搞我最瞎");
        }
        history.push("/");
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.horizontalSplit}>
                <div className={classes.paper}>
                    <img className={classes.imgSpace} src="https://s3-media3.fl.yelpcdn.com/bphoto/K1m1-dXn6rA9MLFuraajyQ/258s.jpg"
                         alt="mealPhoto" width={200} height={300}/>
                    <Typography component="h1" variant="h5">
                        Restaurant
                    </Typography>
                    <Typography component="h1" variant="h5">
                        Food
                    </Typography>
                </div>
                <div className={classes.paper}>
                    <img src={""} alt="accept!" width={200} height={300}
                         onClick={navigationToWhateverPage(-0.5)}/>
                    <img src={""} alt="reject!" width={200} height={300}
                         onClick={navigationToWhateverPage(1)}/>
                </div>
            </div>
        </Container>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultPage)