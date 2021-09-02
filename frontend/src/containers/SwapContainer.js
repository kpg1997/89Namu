import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTreeList, buyingTree } from "../modules/swap";
import Swap from "../components/Swap";

function SwapContainer({palgunamu, account, setHolomi, setHTR}) {
    const treeList = useSelector((state) => state.swap.treeList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTreeList());
    }, []);

    const onBuyingTree = async (treeId) => {
        const buyerData = {
            treeId,
            account
        }

        try {
            await palgunamu.methods.swap(200,treeId).send({from: account});
            dispatch(buyingTree(buyerData));
            await setHolomi();
            await setHTR();
        } catch (error) {
            console.log(error.message);
        }
    };


    return <Swap treeList={treeList} onBuyingTree={onBuyingTree}/>;
}

export default SwapContainer;