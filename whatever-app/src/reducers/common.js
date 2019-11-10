import {LOAD_DATA_SUCCESS, CHOOSE_GENDER} from "../core/constant"
const initialState = {
    genderType: null,
    data: [],
};

export default function common(state = initialState, action) {
    switch (action.type) {
        case CHOOSE_GENDER:
            return Object.assign({}, state, {
                genderType: action.data.genderType,
            });
        case LOAD_DATA_SUCCESS:
            return Object.assign({}, state, {
                data: action.data,
            });
        default:
            return state
    }
}