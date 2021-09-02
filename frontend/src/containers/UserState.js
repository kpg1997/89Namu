import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoginBtn from '../components/LoginBtn'
import SignupBtn from '../components/SignupBtn';
import UserInfo from '../components/UserInfo';
import { getAddress } from "../modules/user";
import { Link } from 'react-router-dom';
import '../style/UserState.scss';

const UserState = ({  account,  setHolomi, setHTR,  }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    useEffect(async () => {
        dispatch(getAddress(account));
        await setHolomi();
        await setHTR();
    }, []);
    
    if(user.userId == "")
        return (
            <div className="UserBox">
                <LoginBtn />
                <SignupBtn />
            </div>
        )
    else {
        return (
            <div className="UserBox">
                <UserInfo user={user} />
                <div className="Nav_mypage">
                    <Link to="/mypage" className="link_logined">
                        Mypage
                    </Link>
                </div>
            </div>
        )
    }
}

export default UserState
