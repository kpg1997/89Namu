import React from "react";
import "../style/staking.scss";

function DepositPage(props) {
    const { etherVal, onChange, onDeposit } = props;

    return (
        <div className="depositBox">
        <h1>STAKING</h1>
        <div className="inpETH">
            <input type="number" min="0.1" value={etherVal} onChange={onChange} placeholder="Input Ether"/>
        </div>
        <div className="period">
            <button type="button" onClick={() => onDeposit(1)}>
                1 minutes
                <hr />
                10x
            </button>
            <button type="button" onClick={() => onDeposit(3)}>
                3 minutes
                <hr />
                30x
            </button>
            <button type="button" onClick={() => onDeposit(5)}>
                5 minutes
                <hr />
                50x
            </button>
        </div>
        </div>
    );
}

export default DepositPage;
