import React from "react";
import BG from "../../public/backgrouond.png";
import "../style/Footer.scss";
const Footer = () => {
  return (
    <div className="Footer">
      <div className="BG">
        <img src={BG} />
      </div>
      <div className="realFooter"></div>
    </div>
  );
};

export default Footer;
