import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { delay, put, takeEvery,call } from 'redux-saga/effects';
import axios from 'axios';


const PRODUCTLIST = "product/PRODUCTLIST";


export const productList = createAction(PRODUCTLIST,(list)=>list);

////////////
const SETPRODUCTLIST = "product/SETPRODUCTLIST";
const BUYPRODUCT = "product/BUYPRODUCT";

export const setproductlist = createAction(SETPRODUCTLIST,(list)=>list);
export const buyProduct = createAction(BUYPRODUCT,(list)=>list);

function* tasksetProductList(){
    const list = yield call([axios,"get"],"/product",JSON);
    yield put(productList(list.data));

}
function* taskBuyProduct(params){
    yield delay(1000);
    const result = yield call([axios,"post"],"/product/buy",{data:params.payload});
    if(result.data.success == true){
        alert("구매 완료");
    }
}

export function* waitProductList(){
    yield takeEvery(SETPRODUCTLIST,tasksetProductList);
}
export function* waitBuyProduct(){
    yield takeEvery(BUYPRODUCT,taskBuyProduct);
}

const initialState = {
    productList : [],
    buyProduct:[]
}


const product = handleActions({
    [PRODUCTLIST]: (state, {payload : input}) =>
        produce(state, (draft) => {
            draft.productList=input.list;
        })
},initialState);

export default product;