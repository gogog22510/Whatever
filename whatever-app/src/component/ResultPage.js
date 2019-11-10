import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {RESULT_DECISION} from "../core/constant";
import rejectBtnImage from "../image/reject.jpg";
import acceptBtnImage from "../image/accept.jpg";
import {isEmpty} from "../core/api";
import {makeDataRequest} from "../core/request";

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
    imgPointer: {
        "&:hover": {
            cursor: "pointer"
        },
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

    useEffect(() => {
        if (!menu) {
            history.push("/");
        }
    }, []);

    const navigationToWhateverPage = (acceptOrNot) => () => {
        const score = acceptOrNot ? -0.5 : 1;
        const count = prevCount + score;
        dispatchDecisionResult({
            decision: count
        });
        if (acceptOrNot) {
            alert("我就隨便我驕傲");
        } else {
            alert("我就難搞我最瞎");
        }
        history.push("/");
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.horizontalSplit}>
                <div className={classes.paper}>
                    <img className={classes.imgSpace} src={menu && menu.photourl}
                         alt="mealPhoto" width={200} height={300}/>
                    <Typography component="h1" variant="h5">
                        {menu && menu.restaurant}
                    </Typography>
                    <Typography component="h1" variant="h5">
                        {menu && menu.item}
                    </Typography>
                </div>
                <div className={classes.paper}>
                    <img className={classes.imgPointer} src={acceptBtnImage} alt="accept!" width={100} height={100}
                         onClick={navigationToWhateverPage(true)}/>
                    <img className={classes.imgPointer} src={rejectBtnImage} alt="reject!" width={100} height={100}
                         onClick={navigationToWhateverPage(false)}/>
                </div>
            </div>
        </Container>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultPage)