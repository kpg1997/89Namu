// 토큰 구매
import React from "react";
import "../style/buyingToken.scss";

function BuyingTokenPage(props) {
  const { onChange, ether, BuyTokenClick } = props;

  return (
    <div className="buytoken_gb">
    <div className="buyingTokenBox">
      <h1>HOLOMI</h1>
      <div className="buying">
        <div className="ether">
          <input
            type="number"
            onChange={onChange}
            value={ether}
            min="1"
            max="100"
            placeholder="0"
          />
          <span className="unit">ETH</span>
        </div>
        <div className="token">
          <div className="toHolomi">{ether * 100}</div>
          <span className="unit">HLM</span>
        </div>
      </div>
      <div className="rate">1 ETH = 100 HLM</div>
      <div className="btton">
        <button type="button" onClick={()=>{
          BuyTokenClick(ether);
        }}>BUY</button>
      </div>
    </div>      
    </div>
  );
}

export default BuyingTokenPage;