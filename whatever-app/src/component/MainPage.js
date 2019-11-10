import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {LOAD_DATA_SUCCESS, RANDOM_MENU, RESULT_DECISION} from "../core/constant";
import {makeDataRequest} from "../core/request";
import princeImage from "../image/prince.png";
import princessImage from "../image/princess.png";
import blindJohnImage from "../image/blindJohn.jpg";
import modelFemaleImage from "../image/modelFemale.jpeg";
import modelLGBTQImage from "../image/modelLGBTQ.jpg";
import modelMaleImage from "../image/modelMale.jpg";
import whateverLogo from "../image/whateverLogo.png";
import loadingGif from "../image/loading.gif";
import ProgressBar from "./ProgressBar";
import {Typography} from "@material-ui/core";
import blindFunction from "../core/blindFunction";
import {isEmpty} from "../core/api";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import blindImage from "../image/blind.jpg";
import notBlindImage from "../image/good.gif";

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
    topBar: {
        display: "flex",
    },
    imgSpace: {
        marginRight: theme.spacing(5),
        marginLeft: theme.spacing(5),
    },
    whateverButton: {
        marginRight: theme.spacing(5),
        marginLeft: theme.spacing(5),
        "&:hover": {
            cursor: "pointer"
        }
    },
}));

const randomMenu = data => {
    // return the data
    const min = 0;
    const max = data.length;
    const rand = Math.floor(min + Math.random() * (max - min));
    return data[rand];
};

const genderImage = [
    princessImage,
    blindJohnImage,
    princeImage
];

const modelImage = [
    modelFemaleImage,
    modelLGBTQImage,
    modelMaleImage
];

const mapStateToProps = (state, ownProps) => {
    return {
        common: state.common,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchLoadDataSuccess: data => dispatch({
            type: LOAD_DATA_SUCCESS,
            data: data
        }),
        dispatchRandomMenu: data => dispatch({
            type: RANDOM_MENU,
            data: data
        }),
        dispatchDecisionResult: data => dispatch({
            type: RESULT_DECISION,
            data: data
        }),
    }
};
function SimpleDialog(props) {
    const {open, blindOrNot, handleClose} = props;
    const handleShowImage = (blindOrNot) => {
        if(blindOrNot){
            return <img src={blindImage} alt="瞎!" width={300} height={300}/>
        } else {
            return <img src={notBlindImage} alt="隨便!" width={400} height={400}/>
        }
    };
    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose}>
            <DialogTitle id="simple-dialog-title">{blindOrNot ? "我最瞎" : "我最隨便"}</DialogTitle>
            {handleShowImage(blindOrNot)}
        </Dialog>
    );
}

function MainPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const {common, dispatchLoadDataSuccess, dispatchRandomMenu, dispatchDecisionResult} = props;
    const {data, genderType, decision} = common;
    const [loading, setLoading] = React.useState(false);

    const [openDialog, setOpenDialog] = React.useState(false);
    const [blindOrNot, setBlindOrNot] = React.useState(false);

    const verticalHorizontal = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    useEffect(() => {
        console.log(`count = ${decision}`);
        if (!genderType) {
            history.push("/start");
        }
        else {
            if (isEmpty(data)) {
                makeDataRequest(data => {
                    console.log(data);
                    dispatchLoadDataSuccess(data);
                });
            }
        }

        // alert model state
        const blindPoint = calculateBlindPoint();
        if (blindPoint <= 0) {
            dispatchDecisionResult({
                decision: 1
            });
            //alert("我最隨便");
            setBlindOrNot(false);
            setOpenDialog(true);
        }
        else if (blindPoint >= 100) {
            dispatchDecisionResult({
                decision: 1
            });
            //alert("我最瞎");
            setBlindOrNot(true);
            setOpenDialog(true);
        }
    }, []);

    const handleRandom = evt => {
        const selected = randomMenu(data);
        console.log(selected);
        dispatchRandomMenu(selected);
        setLoading(true);
        setTimeout(() => {
            history.push("/result");
        }, 500);
    };

    const calculateBlindPoint = () => {
        const point = blindFunction(decision);
        console.log(`point = ${point}`);
        return point;
    };

    return (
        <Container component="main" maxWidth="xs">
            <SimpleDialog blindOrNot={blindOrNot} open={openDialog} handleClose={evt => setOpenDialog(false)} />
            <div className={classes.paper}>
                <div className={classes.topBar}>
                    <img className={classes.imgSpace} src={modelImage[genderType-1]} alt="model" width={200} height={300} />
                    <div style={verticalHorizontal}>
                        <Typography>Blind Point</Typography>
                        <ProgressBar percentage={calculateBlindPoint()} />
                    </div>
                    <img className={classes.imgSpace} src={genderImage[genderType-1]} alt="gender" width={200} height={300} />
                </div>
                <div style={verticalHorizontal}>
                    {!loading && <img className={classes.whateverButton} src={whateverLogo} alt="whatever" width={150} height={150} onClick={handleRandom}/>}
                    {loading && <img className={classes.whateverButton} src={loadingGif} alt="loading" width={250} height={150}/>}
                </div>
            </div>
        </Container>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage)