var express = require('express');
var router = express.Router();
const client = require('./mariaDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

//====================================회원가입============================
router.post('/sign_up', async (req, res) => {
    let id = req.body.id;
    let pw = req.body.pw;
    let encryptedPassword = bcrypt.hashSync(pw, 10);
    try {
        const conn = await client.getConnection();
        await conn.query("insert into user (id, password) values (?,?)", [id, encryptedPassword]);
        res.send({success:true});
        conn.release();
    } catch (error) {
        res.send({error})
    }
    

})


//====================================ID중복확인 ============================

router.post('/IDCheck', async (req, res)=>{
    let id = req.body.id;
    
    try {
        const conn = await client.getConnection();

        let data = await conn.query('select * from user where id = ?',[id]);
        if(data.length == 1){
            res.send({IDCheck : false, message: "이미 중복된 ID 입니다."})
        }
        else{ res.send({IDCheck : true, message : "사용 가능한 ID 입니다." })}
        conn.release();
    } catch (error) {
        res.send({error})
    }
});

//======================================로그인================================================================================

router.post('/login', async (req, res) => {

        try {
            const conn = await client.getConnection();
    
           let user = await conn.query('select * from user where id = ?',[req.body.id]);
           if(user.length != 1) {
               conn.release();
            return res.json({
                loginSuccess : false,
                message : '아이디에 해당하는 유저가 없습니다.'
            });
        }
        //있으면 비밀번호 일치여부 확인
        let isValid = bcrypt.compareSync(req.body.password, user[0].password)
        if(!isValid){
            res.send({loginSuccess:false, message: '비밀번호가 틀렸습니다.'});
            conn.release();
        }

        else{

            let userid = user[0].id;
            let HTR = user[0].HTR;
            //비번이 맞다면 토큰생성
            let token = jwt.sign(userid, process.env.JWT_PWD)
            await conn.query("update user set token = ? where id = ?",[token,req.body.id]);
            // if (err1) return res.status(400).send(err);
            //토큰을 저장해야하는데 쿠키, 로컬스토리지등이 있다.
            res.cookie('Namu', token).status(200).json({
                loginSuccess: true,
                userId: userid,
                HTR: HTR,
            });
            
            conn.release();
            
        }
        } catch (error) {
            console.log(error)
            res.send({error})
        }
    });
    

//======================================로그아웃================================================================================
router.get('/logout', async(req, res) =>{
    let token = req.cookies.Namu;
    let decoded = jwt.verify(token,"Namu");
    try {
        const conn = await client.getConnection();
        await conn.query("update user set token = '' where token = ?",[token])
        res.clearCookie("Namu", token).status(200).send({message:"Log Out!!"})
        conn.release();
    } catch (error) {
        res.send({error})
    }
  });

//=======================================토큰 로그인========================================================================
router.post('/login_token', async(req, res) => {

    //요청된 이메일이 DB에 있는지 찾는다.

    try {
        const conn = await client.getConnection();
        let user = await conn.query('select * from user where token = ?',[req.body.token]);
        if(user.length!= 1){
            res.json({
                loginSuccess : false
            });
            conn.release();
        }
        else{
            res.status(200).json({
                loginSuccess: true,
                HTR : user[0].HTR,
                userId: user[0].id,
              });
              conn.release();
        }
    } catch (error) {
        res.send({error})
    }
});

   

module.exports = router;
