import { GET_USERS, SIGNIN_INPUT, SIGNIN_SUBMIT } from './constant';

let initialState = {
    signin: { email: "", password: "" }
};

const reducer = (state = initialState, action) => {
    const newState = { ...state };
    console.log("reducer Signin Information", action.payload);

    switch (action.type) {
        case SIGNIN_INPUT:
            return newState[action.payload.name] = action.payload.value;
            break;
        case SIGNIN_SUBMIT:
            newState.email = action.payload.email;
            return newState.password = action.payload.password;
            break;
    }
    return newState;
};

export default reducer;

export {initialState};