import React, { useEffect } from "react";
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {buyProduct, setproductlist} from "../modules/product";

function ProductContainer({palgunamu,account, setHolomi}) {
  const dispatch = useDispatch();

  async function buySol(name, etherAmount){
    const productAmount = 1;
    let etherCost = window.web3.utils.toWei(String(etherAmount), 'Ether');
    await palgunamu.methods.buying(name,productAmount).send({from:account, value:etherCost});
  };

  useEffect(async () => {
    dispatch(setproductlist());
  }, []);
  
  const list = useSelector((state)=> state.product.productList);
  
  const userId = useSelector((state)=> state.user.userId);

  const onBuyClick = async (name,price) => {
    if(userId == "" ){
        alert('로그인을 해주세요')
    }else{
        let product = {
          name,
          price
        }
        try {
          await buySol(name,price);
          await setHolomi();
          dispatch(buyProduct(product));
        } catch (e) {
          console.log(e.message);
        }
    }
  };
  return (
  <Product onBuyClick={onBuyClick} list={list}/>
  );
}

export default ProductContainer;