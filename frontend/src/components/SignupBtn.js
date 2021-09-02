import React,{ useEffect, useState } from 'react'

import Modal from 'react-modal';
import axios from 'axios';

import '../style/UserState.scss';

import signupImg from '../images/Signupimg.png';
import Logo from '../images/Logo-removebg-preview.png';

import {IoIosClose} from 'react-icons/io';
import {BiUser} from 'react-icons/bi';
import {RiLockPasswordLine} from 'react-icons/ri';


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
        height:"500px",
        borderRadius: "15px",
    },
    overlay: {
        background :"rgba(0,0,0,0.75)"
    }
};


const SignupBtn = () => {

    
    let reg_id = /^[A-Za-z0-9_-]{4,16}$/;
    let reg_pw = /(?=.*[a-zA-Z0-9S])(?=.*?[#?!@$%^&*-]).{4,16}/; // 문자와 특수문자 조합의 6~24 자리

    const [userid, setuserid] = useState('');
    const [userpwd, setuserpwd] = useState('');
    const [usercheckpwd, setusercheckpwd] = useState('');
    const [checkpwd, setcheckpwd] = useState(true);
    
    const [idmsg, setIdmsg] = useState("");
    const [pwmsg, setPwmsg] = useState("");
    const [pwdcheckmsg, setPwdcheckmsg] = useState("");

    const [Cidmsg, setCIdmsg] = useState(false);
    const [Cpwmsg, setCPwmsg] = useState(false);
    const [Cpwdcheckmsg, setCPwdcheckmsg] = useState(false);

    const  onidhandler =  (e) => {
        setuserid(e.target.value);
    };
    const onpwdhandler = (e) => {
        setuserpwd(e.target.value);
    };
    const oncheckpwdhandler = (e) => {
        setusercheckpwd(e.target.value);
    };

    const oncheckid = () => {
        if(!reg_id.test(userid)){
            setIdmsg("아이디는 4~16자, 영문,숫자만 가능합니다")
        }
        else{
            let body = {
                id : userid
            }
            axios.post('/user/IDCheck',body).then((res) => {
                if (res.data.message === "사용 가능한 ID 입니다.") {
                    setIdmsg("사용 가능한 아이디입니다")
                    setCIdmsg(true)
                } else {
                    setIdmsg("이미 중복된 아이디입니다.")
                    setCIdmsg(false)
                }
            });
        }
    };

    useEffect(()=>{
        oncheckid();
    },[userid]);

    useEffect(() => {
        if (userpwd === usercheckpwd) {
            setPwdcheckmsg("비밀번호가 일치합니다");
            setCPwdcheckmsg(true)
        } else {
            setPwdcheckmsg("비밀번호가 일치하지 않습니다");
            setCPwdcheckmsg(false)
        }
    }, [usercheckpwd]);

    const oncheckpwd = () =>{
        if(!reg_id.test(userpwd)){
            setPwmsg("비밀번호는 4~16자, 문자,숫자만 가능합니다");
            setCPwmsg(false);
        }
        else {setPwmsg("사용가능한 비밀번호입니다"); };
        setCPwmsg(true);
    }
    useEffect(()=>{
        oncheckpwd();
    },[userpwd])

    const onsubmit = () => {
        if (userid == '' || userpwd == '' || usercheckpwd == '') {
            alert('빈 곳 없이 입력해주세요!!');
        } else if (checkpwd === false) {
            alert('비밀번호가 같은지 확인해주세요!!');
        } else if (Cidmsg === false) {
            alert('아이디를 확인해주세요!!');
        } else if (Cpwmsg === false) {
            alert('비밀번호를 확인해주세요!!');
        } else {
            let body = {
                id : userid,
                pw : userpwd,

            }
            axios.post('/user/sign_up', body).then((res) => {
                if(res.data.success == true){
                    alert("회원가입이 완료되었습니다");
                }
                else{
                    alert("회원가입이 실패하였습니다. 다시 한 번 시도해주세요");
                }
            });
        }
    };

    const [modalIsOpen, setIsOpen] = useState(false);
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
                <div>    <img src={signupImg} /></div>
                <div>    89NAMU 회원가입</div>
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
              <div className="input_ID">  <BiUser size="30" color="gray"/><input type="text"id="ID_input" onChange={onidhandler} placeholder="ID"/>      </div>
              <div className="input_PW">  <RiLockPasswordLine size="30" color="gray"/><input type="password" onChange={onpwdhandler} id="PW_input" placeholder="비밀번호"/>      </div>
              <div className="input_PW2">  <RiLockPasswordLine size="30" color="gray"/><input type="password" onChange={oncheckpwdhandler}  id="PW_input" placeholder="비밀번호 확인"/>      </div>
               
            </div>  
            <button onClick={onsubmit}> 회원가입</button>    
            </div>
            </Modal>
        </>
    )
}

export default SignupBtn
