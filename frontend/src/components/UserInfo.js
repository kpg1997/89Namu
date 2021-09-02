import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../modules/user';
import {BiUser} from 'react-icons/bi'
const UserInfo = ({user}) => {
    const dispatch = useDispatch();
    return (
        <div >
            <input type="checkbox" id="userStateBox" />
            <label for="userStateBox" className="usericon"><BiUser color="#2c5814" size="40"/></label>
            <div className="userinfo">

                <div className='userid_box'>
                    <div className="Hi"><big>{user.userId}</big>님<br /></div>
                    <div className="logout_btn"><button onClick={() => dispatch(logout())}>로그아웃</button></div>
                </div>
                <div className='useraccount_box'>
                    <div className="user_account1"> <marker>MetaMask</marker>  Account</div>
                    <div className="user_account2">{user.Address}</div>
                </div>
                <div className='have_token'>
                    <div className="token_box1">
                        <div className="token_name">HLM<small>(ERC20)</small></div>
                        <div className="token_count">{user.Holomi}</div>
                    </div>
                    <div className="token_box2">
                        <div className="token_name">HTR<small>(NFT)</small></div>
                        <div className="token_count">{user.HTR}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
