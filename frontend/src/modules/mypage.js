import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery, call } from 'redux-saga/effects';
import produce from 'immer';
import axios from 'axios';

// define action of saga
const GETDATA = "staking/GETDATA";
export const getData = createAction(GETDATA);


// define action of reducer
const LOADMYPAGE = "staking/LOADMYPAGE";
const loadMypage = createAction(LOADMYPAGE);


// action function of saga
function* takeGetData() {
    const getDataResult = yield call([axios, "get"], "/mypage");
    yield put(loadMypage(getDataResult.data));
}


// saga function
// export into modules/index.js
export function* waitGetData() {
    yield takeEvery(GETDATA, takeGetData);
}


// initial state of reducer
const initialState = {
    // getUserData: [],
    getProdData: [],
    // getTokenData: [],
    getTreeData: [],
    getStakingData: []
}


// reducer function using immer as produce
// export into modules/index.js
export const mypage = handleActions({
    [LOADMYPAGE]: (state, action) => 
        produce(state, (draft) => {
            // draft.getUserData = action.payload.getUserData;
            draft.getProdData = action.payload.getProdData;
            // draft.getTokenData = action.payload.getTokenData;
            draft.getTreeData = action.payload.getTreeData;
            draft.getStakingData = action.payload.getStakingData;
        }
    )
}, initialState);