import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw, timeLock, getStakingData, setSolStaking, forcedWithdraw } from "../modules/staking";
import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";

function StakingContainer({palgunamu, account, setHolomi}) {
    const [etherVal, setEtherVal] = useState("");
    const stakingDate = useSelector((state) => state.staking.stakingDate);
    const timeLockState = useSelector((state) => state.staking.timeLock);
    const solState = useSelector((state) => state.staking.solState);
    const dispatch = useDispatch();
    
    useEffect( async() => {
        const state = await palgunamu.methods.isDeposited(account).call();
        dispatch(setSolStaking(state));

        if(solState) {
            dispatch(getStakingData());
            dispatch(timeLock());
        }
    }, [solState, stakingDate]);

    const onChange = (e) => {
        setEtherVal(e.target.value);
    };

    const onDeposit = async (minutes) => {
        if(etherVal <= 0){
            alert("Please enter ETHER greater than 0");            
            window.location.reload();
        }
        else {
            const depositData = {
                minutes,
                etherVal
            }
            
            try {
                let etherCost = window.web3.utils.toWei(String(etherVal), 'Ether');
                await palgunamu.methods.deposit(minutes).send({from: account, value: etherCost});
                dispatch(deposit(depositData));
                setEtherVal(0);
                await setHolomi();
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const onWithdraw = async () => {
        if(timeLockState) {
            try {
                await palgunamu.methods.withdraw().send({from: account});
                dispatch(withdraw());
            } catch (error) {
                console.log(error.message);
            }
        }
        else {
            alert("Not enough time has passed.");
        }
    }

    const onForcedWithdraw = async () =>{
        try {
            let res = window.confirm("강제 출금을 하시겠습니까?(강제 출금 시 토큰을 받을 수 없습니다.)");
            if(res == true) {
                await palgunamu.methods.cancellationDeposit().send({from: account});
                dispatch(forcedWithdraw());
                alert('강제 출금 완료')
            }else{
                alert('취소 하셨습니다.')
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="staking_bg">
            {
                solState? 
                <Withdraw 
                    stakingDate={stakingDate}
                    onWithdraw={onWithdraw}
                    onForcedWithdraw={onForcedWithdraw}
                /> 
                : 
                <Deposit 
                    etherVal={etherVal} 
                    onChange={onChange} 
                    onDeposit={onDeposit}
                />
            }   
        </div>
    );
}

export default StakingContainer;
