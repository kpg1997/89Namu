import React from "react";
import "../style/staking.scss";

function WithdrawPage(props) {
    const { stakingDate, onWithdraw, onForcedWithdraw } = props;

    return (
        <div className="withdrawBox">
        <h1>STAKING</h1>
        <div className="withdraw">
            <div className="ether">
                <span className="unit">Ether</span>
                <div className="underline">{stakingDate.ether}</div>
            </div>
            <div className="ether">
                <span className="unit">Rate</span>
                <div className="underline">{stakingDate.rate * 10} %</div>
            </div>
            <div className="time">
                <span className="unit">Time</span>
                <div className="underline">{stakingDate.startTime}</div>
            </div>
            <div className="time">
                <span className="unit">Elapse</span>
                <div className="underline">{stakingDate.interest} minutes</div>
            </div>
            <div className="token">
                <span className="unit">Holomi</span>
                <div className="underline">{stakingDate.holomi}</div>
            </div>
        </div>
        <div className="withdrawBtn">
            <button type="button" onClick={onWithdraw}>WITHDRAW</button>
        </div>
        <div className="withdrawBtn2">
            <button type="button" onClick={onForcedWithdraw}>CANCEL</button>
        </div>
        </div>
    );
}

export default WithdrawPage;