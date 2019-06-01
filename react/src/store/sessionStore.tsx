import { createStore } from "redux";
import * as userApi from "../api/userApi";
import { ILogin, ISignUpRequest, IUser } from "../api/userApi";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const USER_FETCH = "USER_FETCH";
const NEW_USER = "NEW_USER";

export interface IStoredState {
    token?: string;
    user?: IUser;
}

export interface IAction {
    type: string;
    payload: any;
}

const initialState: IStoredState = {
    token: userApi.getCurrentToken(),
    user: userApi.getCurrentUser(),
};

const sessionStore = createStore((state = initialState, action: IAction) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
            };
        case NEW_USER:
            return {
                ...state,
                token: action.payload.token,
            };
        case USER_FETCH:
            return {
                ...state,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                token: undefined,
                user: undefined,
            };
        default:
            return state;
    }
});

export async function login(payload: ILogin): Promise<IUser> {
    try {
        const data = await userApi.login(payload);
        sessionStore.dispatch({
            payload: data,
            type: LOGIN,
        });
        const response = await reloadCurrentUser();
        return Promise.resolve(response);
    } catch (err) {
        sessionStore.dispatch({
            payload: undefined,
            type: LOGOUT,
        });
        return Promise.reject(err);
    }
}

export async function newUser(payload: ISignUpRequest): Promise<IUser> {
    try {
        const data = await userApi.newUser(payload);
        sessionStore.dispatch({
            payload: data,
            type: NEW_USER,
        });
        const response = await reloadCurrentUser();
        return Promise.resolve(response);
    } catch (err) {
        sessionStore.dispatch({
            payload: undefined,
            type: LOGOUT,
        });
        return Promise.reject(err);
    }
}

async function reloadCurrentUser(): Promise<IUser> {
    try {
        const data = await userApi.reloadCurrentUser();
        sessionStore.dispatch({
            payload: data,
            type: USER_FETCH,
        });
        return Promise.resolve(data);
    } catch (err) {
        sessionStore.dispatch({
            payload: undefined,
            type: LOGOUT,
        });
        return Promise.reject(err);
    }
}

export async function logout(): Promise<void> {
    try {
        await userApi.logout();
        sessionStore.dispatch({
            payload: undefined,
            type: LOGOUT,
        });
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

if (userApi.getCurrentToken() !== undefined) {
    reloadCurrentUser().then();
}

export default sessionStore;
