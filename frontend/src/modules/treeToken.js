import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { delay,  takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

 const PUTX = "tree/PUTX";
 const PUTY = "tree/PUTY";
 const PUTAMOUNT = "tree/PUTAMOUNT";
 const PUTIMG = "tree/PUTIMG";

export const putX = createAction(PUTX,(x)=>x);
export const putY = createAction(PUTY,(y)=>y);
export const putAmount = createAction(PUTAMOUNT,(amount)=>amount);
export const putImg = createAction(PUTIMG,(img)=>img);


const SETTREETOKEN = "tree/SETTREETOKEN";

export const setTreeToekn = createAction(SETTREETOKEN,(input)=>input);

function* taskSetTreeToekn(params){
    yield delay(1000);
    const result = yield call([axios,"post"],"/treeToken/setTreeToken",{data:params.payload});
    if(result.data.success == true){
        alert("나무토큰 생성 완료");
    }
}

export function* waitSetTreeToken(){
    yield takeEvery(SETTREETOKEN,taskSetTreeToekn)
}

const initialState = {
    x:0,
    y:0,
    amount: 1,
    img:"",
}


const tree = handleActions({
    [PUTX] : (state, {payload : input}) =>
        produce(state, (draft) => {
            draft.x = input
        }),
    [PUTY] : (state, {payload : input}) =>
        produce(state, (draft) => {
            draft.y  = input
        }),
    [PUTAMOUNT] : (state, {payload : input}) =>
        produce(state, (draft) => {
            draft.amount  = input
        }),
    [PUTIMG] : (state, {payload : input}) =>
        produce(state, (draft) => {
            draft.img  = input
        }),
},initialState);

export default tree;