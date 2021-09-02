import React from 'react'
import "../style/MainPage.scss"
const Explain = () => {
    return (
        <div className="explain">
            <div className="left_box">
                <div className="left_content"></div>
                <div className="right_content">
                    <h1> 89NAMU는 </h1>
                    <h3>Ethereum으로 물건을 구입하면<br/>
                    토큰(HoLoMi)으로 페이백 해드립니다<br/>
                    HoLoMi로 나만의 나무(HoLoMiTree)를 구입하여<br/>
                    녹색지구를 만들기 위한 프로젝트입니다</h3>
                </div>
            </div>
            <div className="right_box">
                <div className="left_content2">
                    <h1> 89NAMU는 </h1>
                    <h3>ERC Token 기반의 스마트컨트랙트인<br/>
                    HOROMI(ERC20), HOROMITREE(ERC721)을 가지고 만든<br/>
                   DAPP 이며, 실제 상업 목적이 아닌 공부 목적의 프로젝트입니다</h3>
                </div>
                <div className="right_content2">

                </div>
            </div>
        </div>
    )
}

export default Explain

