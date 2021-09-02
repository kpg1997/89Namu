import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery, call } from 'redux-saga/effects';
import produce from 'immer';
import axios from 'axios';

// define action of saga
const DEPOSIT = "staking/DEPOSIT";
const WITHDRAW = "staking/WITHDRAW";
const TIMELOCK = "staking/TIMELOCK";
const GETSTAKINGDATA = "staking/GETSTAKINGDATA";
const SOLSTAKING = "staking/SOLSTAKING";
export const deposit = createAction(DEPOSIT);
export const withdraw = createAction(WITHDRAW);
export const timeLock = createAction(TIMELOCK);
export const getStakingData = createAction(GETSTAKINGDATA);
export const setSolStaking = createAction(SOLSTAKING);


// define action of reducer
const SHOWSTAKINGDATA = "staking/SHOWSTAKINGDATA";
const TIMELOCKFUNC = "staking/TIMELOCKFUNC";
const showStkaingData = createAction(SHOWSTAKINGDATA);
const timeLockFunc = createAction(TIMELOCKFUNC);



// action function of saga
function* takeDeposit(data) {
    const depositResult = yield call([axios, "post"], "/staking/deposit", {data: data.payload});
    if(depositResult.data.success) {
        alert("Staking Deposit Complete!");
        yield put(setSolStaking(true));
        yield put(getStakingData());
    }
}

function* takeWithdraw() {
    const withdrawResult = yield call([axios, "post"], "/staking/withdraw");
    if(withdrawResult.data.success) {
        alert("Staking Withdraw Complete!");
        yield put(setSolStaking(false));
    }
}

function* takeTimeLock() {
    const timeLockResult = yield call([axios, "post"], "/staking/timelock");
    yield put(timeLockFunc(timeLockResult.data.success));
}

function* takeGetStakingData() {
    const getDataResult = yield call([axios, "post"], "/staking/getdata");
    yield put(showStkaingData(getDataResult.data));
}



// saga function
// export into modules/index.js
export function* waitDeposit() {
    yield takeEvery(DEPOSIT, takeDeposit);
}

export function* waitWithdraw() {
    yield takeEvery(WITHDRAW, takeWithdraw);
}

export function* waitTimeLock() {
    yield takeEvery(TIMELOCK, takeTimeLock);
}

export function* waitGetStakingData() {
    yield takeEvery(GETSTAKINGDATA, takeGetStakingData);
}

const FORCEDWITHDRAW = "staking/FORCEDWITHDRAW";
export const forcedWithdraw = createAction(FORCEDWITHDRAW);

function* takeForcedWithdraw(){
    const forcedWithdraw = yield call([axios, "post"], "/staking/forcedWithdraw");
    yield put(setSolStaking(false));
}

export function* waitForcedWithdraw(){
    yield takeEvery(FORCEDWITHDRAW,takeForcedWithdraw);
}



// initial state of reducer
const initialState = {
    stakingDate: [],
    timeLock: false,
    solState:false,
}

// reducer function using immer as produce
// export into modules/index.js
export const staking = handleActions({
    [SHOWSTAKINGDATA]: (state, action) => 
        produce(state, (draft) => {
            draft.stakingDate = action.payload;
        }
    ),
    
    [TIMELOCKFUNC]: (state, action) => 
        produce(state, (draft) => {
            draft.timeLock = action.payload;
        }
    ),

    [SOLSTAKING]: (state, action) => 
        produce(state, (draft) => {
            draft.solState = action.payload;
        }
    )
}, initialState);