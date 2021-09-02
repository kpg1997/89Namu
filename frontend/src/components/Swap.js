import React from "react";
import "../style/swap.scss";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SwapPage(props) {
    const { treeList, onBuyingTree } = props;
    // let sliderLength = treeList.length;
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <div className="swapBox">
            <h1>SWAP</h1>
            <div className="rate">1 Tree = 200 HLM</div>
            <div className="swapping">
                <div className="tree">
                    <h3>Tree Info</h3>
                    

                    {
                        treeList == "" ?
                        <div>트리 토큰 없음</div>:
                        <Slider {...settings}>
                        {treeList.map((tree) => (
                        
                            
                            <div className="treeInfo">
                                <div className="Swap_img"><img src={`https://ipfs.infura.io/ipfs/${tree.htr_imgHash}`} /></div>

                                <div className="Swap_context">
                                <div><strong><big> Identity </big></strong><br/> {tree.htr_id}</div>
                                <div><strong><big>Position </big></strong><br/> ({tree.htr_x}, {tree.htr_y})</div>
                                <div><strong><big>Creation time</big> </strong><br/> {tree.htr_time}</div>
                                <div><strong><big>ImgHash</big>  </strong><br/> {tree.htr_imgHash}</div>
                                </div>
                                <div className="Swap_btn">
                                <button type="button" onClick={() => onBuyingTree(tree.htr_id)}>BUY</button>
                                </div>
                            </div>
                            
                        
                        ))}
                    
                        </Slider>
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default SwapPage;
