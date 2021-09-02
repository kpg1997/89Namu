import React from 'react';
import "../style/MainPage.scss";
import Pil from "../images/필규.png"
import Ha from "../images/하림.png"
import Kyung from "../images/경아.png"
import Su from "../images/수영.png"
import logo from '../images/Logo-removebg-preview.png';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_title">Connect with us </div>
            <div className="row">
                <div className="person">
                    <a href="#" className="image"><img src={Pil} alt="" /></a>
                    <h3> Pil gyu Kang</h3>
                </div>
                <div className="person">
                    <a href="#" className="image"><img src={Ha} alt="" /></a>
                    <h3> Ha lim Song</h3>
                </div>
                <div className="person">
                    <a href="#" className="image"><img src={Kyung} alt="" /></a>
                    <h3> Kyung ah Yoo</h3>
                </div>
                <div className="person">
                    <a href="#" className="image"><img src={Su} alt="" /></a>
                    <h3> Su yeong Lee</h3>
                </div>
            </div>
            <br/>
            <hr color="gray"/>
            <div className="footer_content"> 
                <div className="footer1">
                <img src={logo}/>
                </div>
                <div className="footer2">
                
                <br/>
                서울특별시 강동구 천호대로 995 금복빌딩 4층 경일게임아카데미 6강의실(지하철 5,8호선 1번출구 10m이내)
                <br/>
                TEL : 02-479-4050 FAX : 02-479-4056 
                <br/>
                Github : <Link to="https://github.com/kpg1997/89Namu.git">https://github.com/kpg1997/89Namu.git</Link>
                </div>
            </div>

        </div>
    )
}

export default Footer
