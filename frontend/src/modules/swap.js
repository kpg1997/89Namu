import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery, call } from 'redux-saga/effects';
import produce from 'immer';
import axios from 'axios';

// define action of saga
const LOADTREELIST = "swap/LOADTREELIST";
const BUYINGTREE = "swap/BUYINGTREE";
export const loadTreeList = createAction(LOADTREELIST)
export const buyingTree = createAction(BUYINGTREE)


// define action of reducer
const LOADEDTREELIST = "swap/LOADEDTREELIST";
const loadedTreeList = createAction(LOADEDTREELIST);


// action function of saga
function* takeLoadTreeList() {
    const treeList = yield call([axios, "get"], "/swap");
    yield put(loadedTreeList(treeList.data));
}

function* takeBuyingTree(data) {
    const buyingTreeResult = yield call([axios, "post"], "/swap/buyingtree", {data: data.payload});
    if(buyingTreeResult.data.success) {
        alert("Buying Tree(Swap) Complete!");
        window.location.replace("/");
    }
}


// saga function
// export into modules/index.js
export function* waitLoadTreeList() {
    yield takeEvery(LOADTREELIST, takeLoadTreeList);
}

export function* waitBuyingTree() {
    yield takeEvery(BUYINGTREE, takeBuyingTree);
}


// initial state of reducer
const initialState = {
    treeList: [],
}

// reducer function using immer as produce
// export into modules/index.js
export const swap = handleActions({
    [LOADEDTREELIST]: (state, action) => 
        produce(state, (draft) => {
            draft.treeList = action.payload;
        }
    ),
}, initialState);