import {LOAD_DATA_SUCCESS, LOGIN_SUCCESS} from "../core/constant"
const initialState = {
    user: null,
    data: [],
};

export default function common(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                user: action.data,
            });
        case LOAD_DATA_SUCCESS:
            return Object.assign({}, state, {
                data: action.data,
            });
        default:
            return state
    }
}