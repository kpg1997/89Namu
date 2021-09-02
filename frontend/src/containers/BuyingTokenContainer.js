import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BuyingToken from "../components/BuyingToken";

function BuyingTokenContainer({palgunamu,account, setHolomi}) {
  const [ether, setEther] = useState("0");

  const dispatch = useDispatch();

  const onChange = (e) => {
    setEther(e.target.value);
  };

  const BuyTokenClick= async (ether) =>{
    try {
      let etherCost = window.web3.utils.toWei(String(ether), 'Ether');
      await palgunamu.methods.buyToken().send({from:account, value:etherCost});
      alert('구매가 성공적으로 이루어졌습니다!');
      await setHolomi();
      setEther("0");
    } catch (e) {
      console.log(e.message)
    }
  }

  return <BuyingToken onChange={onChange} ether={ether} BuyTokenClick={BuyTokenClick}/>;
}

export default BuyingTokenContainer;
