import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../modules/mypage";
import MyPage from "../components/MyPage";

function MyPageContainer() {
    const getProdData = useSelector((state) => state.mypage.getProdData);
    const getTreeData = useSelector((state) => state.mypage.getTreeData);
    const getStakingData = useSelector((state) => state.mypage.getStakingData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData());
    }, []);

    return (
        <MyPage
            getProdData={getProdData}
            getTreeData={getTreeData}
            getStakingData={getStakingData}
        />
    );
}

export default MyPageContainer;
