import React,{useState} from 'react';

import Modal from 'react-modal';


import loginImg from '../images/Loginimg.png';


import Logo from '../images/Logo-removebg-preview.png';

import {IoIosClose} from 'react-icons/io';
import {BiUser} from 'react-icons/bi';
import {RiLockPasswordLine} from 'react-icons/ri';
 
import {useDispatch} from "react-redux";
import {login} from '../modules/user'
const customStyles = {

    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background:"white",
        width:"450px",
        height:"450px",
        borderRadius: "15px",
       
    },
    overlay: {
        background :"rgba(0,0,0,0.75)"
    }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function LoginBtn() {
    let subtitle;
    const dispatch = useDispatch();
    const [userid, setUserid] = useState('');
    const [userpw, setUserpw] = useState('');

    const onidhandler = (e) =>{
        setUserid(e.target.value);
    }
    const onpwdhandler = (e) =>{
        setUserpw(e.target.value);
    }
    const onKeyPress=(e)=>{
        if(e.key=='Enter'){
            onsubmit()
        }
    }
    const onsubmit =  (e) => {
        if (userid == '' || userpw == '') {
            alert('빈 곳 없이 입력해주세요!!');
        }
        else {
            let body = {
                id : userid,
                password : userpw,
            }
             dispatch(login(body))
    };
    };
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <button className="LoginBtn" onClick={openModal}>
                <div><img src={loginImg} /></div>
                <div>89NAMU 로그인</div>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                
            >
            <div className="modal_box">

              <div className="img_box">
                    <img className="login_logo" src={Logo}/> 
                    <IoIosClose size="50" color="darkgray" className="X" onClick={closeModal} /></div>
                {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>89NAMU 로그인</h2> */}

            <div className="input_box">
              <div className="input_ID">  <BiUser size="30" color="gray"/><input type="text" onChange={onidhandler} id="ID_input" placeholder="ID를 입력해주세요"/>      </div>
              <div className="input_PW">  <RiLockPasswordLine size="30" color="gray"/><input type="password" onChange={onpwdhandler} id="PW_input" placeholder="비밀번호를 입력해주세요"/>      </div>
            </div>  
            <button onClick={onsubmit} onKeyPress={onKeyPress}> 로그인</button>    
            </div>
            </Modal>
            
        </>
    );
}

export default LoginBtn;