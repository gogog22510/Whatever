import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {LOAD_DATA_SUCCESS, RANDOM_MENU} from "../core/constant";
import {makeDataRequest} from "../core/request";
import princeImage from "../image/prince.png";
import princessImage from "../image/princess.png";
import blindJohnImage from "../image/blindJohn.jpg";
import modelFemaleImage from "../image/modelFemale.jpeg";
import modelLGBTQImage from "../image/modelLGBTQ.jpg";
import modelMaleImage from "../image/modelMale.jpg";
import whateverLogo from "../image/whateverLogo.png";
import ProgressBar from "./ProgressBar";
import {Typography} from "@material-ui/core";

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
    }
};

function MainPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const {common, dispatchLoadDataSuccess, dispatchRandomMenu} = props;
    const {data, genderType} = common;

    const verticalHorizontal = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    useEffect(() => {
        if (!genderType) {
            history.push("/start");
        }
        else {
            console.log(genderType);
            makeDataRequest(data => {
                console.log(data);
                dispatchLoadDataSuccess(data);
            });
        }
    }, []);

    const handleRandom = evt => {
        const selected = randomMenu(data);
        console.log(selected);
        dispatchRandomMenu(selected);
        history.push("/result");
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <div className={classes.topBar}>
                    <img className={classes.imgSpace} src={modelImage[genderType-1]} alt="model" width={200} height={300} />
                    <div style={verticalHorizontal}>
                        <Typography>Blind Point</Typography>
                        <ProgressBar percentage={30} />
                    </div>
                    <img className={classes.imgSpace} src={genderImage[genderType-1]} alt="gender" width={200} height={300} />
                </div>
                <div style={verticalHorizontal}>
                    <img className={classes.whateverButton} src={whateverLogo} alt="whatever" width={150} height={150} onClick={handleRandom}/>
                </div>
            </div>
        </Container>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage)