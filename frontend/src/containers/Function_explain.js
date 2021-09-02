import React from 'react'
import "../style/MainPage.scss"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
const Function_explain = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <div className="Main_Slider">
            <div className="second_slider">

                <Slider {...settings}>
                    <div >
                        <div className="slider_title">Shop</div>
                        <div className="slider_content"> 89NAMU 에서는 의류, 가방, 악세서리 등 친환경 소재로만 제작한 물품들을 판매하고 있습니다.
                        각각의 물품은 Ether로 구입하실 수 있으며, 구입 금액의 10배 (1ETH → 10HLM) 비율로 토큰이 페이백됩니다. </div>
                        <Link to="/shop" className="btn_link">go Shop</Link>
                    </div>
                    <div >
                        <div className="slider_title">Staking</div>
                        <div className="slider_content"> 
                            Staking은 총 3가지 수익률 모델로 구성되어있고, 각각 1,3,5분의 예치기간을 설정한 적금형 DEFI 상품입니다.<br/>
                            각각의 상품은 <strong>1분 : 1ETH → 10HLM/분, 3분 : 1ETH → 30HLM/분, 5분 : 1ETH → 50HLM/분 </strong>이며,
                            예치를 시작하고 해당 시간을 채우지 못하면 출금을 하실 수 없습니다.<br/><small> (※강제 출금은 가능하나 이자를 못 받음)</small>
                        </div>
                        <Link to="/staking" className="btn_link">go Staking</Link>
                    </div>
                    <div >
                        <div className="slider_title">Token</div>
                        <div className="slider_content">
                            HOLOMI<small>(ERC20)</small>은 HOLOMI TREE<small>(NFT)</small>를 구입하기 위한 재화로서 쇼핑, 스테이킹, 직접 구입의 방법으로 얻을 수 있으며,
                            토큰을 직접 구입 시 가격은 1ETH 당 100HLM 입니다.<br/>
                            HOLOMI 토큰 자체의 초기발행량은 없으며, 발행권한도 89NAMU DAPP에 있어 운영질들도 위 예시로 든 구입 방법의 절차를 거치지 않으면 얻을 수 없습니다. 
                        </div>
                        <Link to="/buyingtoken" className="btn_link">go token</Link>
                    </div>
                    <div>
                        <div className="slider_title">Tree</div>
                        <div className="slider_content">
                        HOLOMI TREE<small>(ERC721)</small>는 89NAMU에서 직접 심은 나무에대한 정보를 토대로 발행하지만 발행과 동시에 소유권은
                        89NAMU DAPP으로 이전되어 오로지 HOLOMI토큰으로만 구입 가능한 NFT입니다.<br/>
                        HTR의 구성요소로는 나무가 심어진 위치 정보, 해당 나무 사진, 소유자들의 히스토리로 이루어져있고 나무 사진은 ipfs서버에 해시값 형태로 업로드되며
역대 소유자들의 히스토리 정보들은 블록체인 네트워크에 영구히 기록됨으로 HTR은 실제 심어진 나무에 대한 지분을
증명함으로 실질적인 가치가 담긴 토큰입니다.</div>
                        <Link to="/swap" className="btn_link">go tree</Link>
                    </div>

                </Slider>
            </div>
        </div>
    )
}

export default Function_explain
