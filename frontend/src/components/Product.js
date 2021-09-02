import React from "react";
import "../style/product.scss";

// 메인 페이지, 상품 구매 페이지
function ProductPage({ onBuyClick, list }) {

  return (
    <div className="productList">
      <div className="Sawoojuma">

      {list.map((product) => (
        <>
          <div className="product" key={product.no}>
            {/* <div className="img">1</div> */}
            <img src={`img/${product.img}`} />
            <div className="name"><strong>{product.name}</strong></div>
            <div className="price">{product.price}<small>(ETH)</small></div>
            <div className="button-div">
              <button className="button button--itzel button--text-thick" onClick={()=>{
                onBuyClick(product.name,product.price)
              }}>
                <i className="button__icon icon icon-cart"></i>
                <span>BUY</span>
              </button>
            </div>
          </div>
        </>
      ))}
      </div>
    </div>
  );
}

export default ProductPage;