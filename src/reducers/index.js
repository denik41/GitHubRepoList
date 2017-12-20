import {combineReducers} from 'redux';

const repoInitialState = {
    data: {}
};

const repository = (state = repoInitialState, action) => {
    if (action.type === "CHOOSE_REPO") {
        return {data: action.payload};
    }
    return state;
};

export default combineReducers({
    repository
});