import { combineReducers } from "redux";
import { all } from "@redux-saga/core/effects";
import {persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import product,{ waitProductList,waitBuyProduct } from "./product";
import tree, { waitSetTreeToken } from "./treeToken";
import { staking, waitDeposit, waitGetStakingData, waitWithdraw, waitTimeLock, waitForcedWithdraw } from "./staking";
import { swap, waitLoadTreeList, waitBuyingTree } from "./swap";
import { mypage, waitGetData } from "./mypage";
import user, {waitlogin,waitlogout,waitlogintoken} from "./user";

const persistConfig = {
    key:"root",
    storage,
    whitelist:[],
}

const rootreducer = combineReducers({
    user,
    product,
    tree,
    staking,
    swap,
    mypage,
});

export function* rootsaga() {
    yield all([
        waitlogin(), 
        waitlogout(), 
        waitlogintoken(),
        waitProductList(),
        waitBuyProduct(),
        waitSetTreeToken(),
        
        waitDeposit(),
        waitWithdraw(),
        waitTimeLock(),
        waitGetStakingData(),
        waitLoadTreeList(),
        waitBuyingTree(),
        waitForcedWithdraw(),
        waitGetData(),
    ]);
}

// export default rootreducer;
export default persistReducer(persistConfig,rootreducer);