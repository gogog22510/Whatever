import {LOAD_DATA_SUCCESS, CHOOSE_GENDER, RANDOM_MENU, RESULT_DECISION} from "../core/constant"
const initialState = {
    genderType: null,
    data: [],
    menu: null,
    decision: 0,
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
        case RANDOM_MENU:
            return Object.assign({}, state, {
                menu: action.data,
            });
        case RESULT_DECISION:
            return Object.assign({}, state, {
                decision: action.data.decision,
            });
        default:
            return state
    }
}