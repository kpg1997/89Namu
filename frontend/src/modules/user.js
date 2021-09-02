import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { put, takeEvery, takeLatest,call } from 'redux-saga/effects';
import axios from 'axios';

const initialState = {
    userId: '',
    HTR:'',
    Holomi:0,
    Address:"",
    loginSuccess: false,

};


const GETADDRESS = "user/GETADDRESS";
export const getAddress = createAction(GETADDRESS,(user)=>user);

const GETHTR = "user/GETHTR";
export const getHTR = createAction(GETHTR,(user)=>user);

const GETHOLOMI = "user/GETHOLOMI";
export const getHOLOMI = createAction(GETHOLOMI,(user)=>user);

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그인 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const LOGIN = 'user/LOGIN';
export const login = createAction(LOGIN, (user) => user);

const INPUTUSER ='user/INPUTUSER';
export const inputuser=createAction(INPUTUSER,(input)=>input);

function* LoginUser(body) {
    const initdata = yield call([axios, 'post'], '/user/login', body.payload);
    if(initdata.data.loginSuccess == true){
        yield put(inputuser(initdata.data))
    }
    else if(initdata.data.loginSuccess==false){
       yield alert(initdata.data.message)
   }
}

export function* waitlogin(){
    yield takeEvery(LOGIN,LoginUser)
}

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그아웃 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const LOGOUT = 'user/LOGOUT';
export const logout = createAction(LOGOUT, (logout)=>logout); 

const LOGOUTUSER = 'user/LOGOUTUSER';
export const logoutuser = createAction(LOGOUTUSER, (data)=>data)



function* LogoutUser(){
    const initdata = yield call([axios, 'get'], '/user/logout')
    yield alert(initdata.data.message)
    yield put(logoutuser(initdata.data))
}


export function* waitlogout(){
    yield takeEvery(LOGOUT,LogoutUser)
}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ토큰 자동 로그인 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const LOGINTOKEN = 'user/LOGINTOKEN'; 
export const login_token = createAction(LOGINTOKEN, (user) => user);

const INPUTUSERTOKEN ='user/INPUTUSERTOKEN';
export const inputusertoken=createAction(INPUTUSERTOKEN,(input)=>input);

function* LoginTokenUser(body) {
    
    const initdata = yield call([axios, 'post'], '/user/login_token', body.payload);
    if(initdata.data.loginSuccess==true){
        yield put(inputusertoken(initdata.data))
    }
}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ업데이트 유저 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ



export function* waitlogintoken(){
    yield takeLatest(LOGINTOKEN,LoginTokenUser)
}

const user = handleActions(
    {
        [INPUTUSER]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.userId = input.userId;
                draft.loginSuccess= input.loginSuccess;
                draft.HTR = input.HTR;
            }),

        [LOGOUTUSER]: (state, {payload: data}) =>
            produce(state, (draft) =>
            draft = initialState),

        [INPUTUSERTOKEN]: (state, {payload : input}) =>
            produce(state, (draft)=>{
                draft.userId = input.userId;
                draft.loginSuccess = input.loginSuccess;
                draft.HTR = input.HTR;
            }),
        [GETHTR] : (state,{payload :input}) =>
            produce(state, (draft) => {
                draft.HTR = input;
            }),
        [GETHOLOMI] : (state,{payload :input}) =>
            produce(state, (draft) => {
                draft.Holomi = input;
            }),
        [GETADDRESS] : (state,{payload :input}) =>
            produce(state, (draft) => {
                draft.Address = input;
            }),
    },
    initialState
);

export default user;