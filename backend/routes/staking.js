const express = require("express");
const router = express.Router();
const mariadb = require("./mariaDB");
const moment = require("moment");
const jwt = require('jsonwebtoken');

require('dotenv').config();

router.get("/", async(req, res, next) => {
    try {
        let token = req.cookies.Namu;
        let decoded = jwt.verify(token, process.env.JWT_PWD);

        const connection = await mariadb.getConnection();
        const stakingState = await connection.query("select state from staking where id = ? order by idx desc", [decoded]);
        
        if(stakingState[0] == undefined)
            stakingState[0] = 0;

        res.send({ stakingState: stakingState[0] });
        
        connection.release();
    } catch (error) {
        console.log(error);
    }
});

router.post("/deposit", async (req, res, next) => {
    try {
        let token = req.cookies.Namu;
        let decoded = jwt.verify(token, process.env.JWT_PWD);

        const connection = await mariadb.getConnection();
        const body = req.body.data;
        const minutes = body.minutes;
        const etherVal = Number(body.etherVal);
        const startTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

        await connection.query("insert into staking (id, ether, rate, startTime, state) values (?,?,?,?,?)", 
            [decoded, etherVal, minutes, startTime, 1]
        );

        res.send({ success: true });
        connection.release();
    } catch (error) {
        console.log(error);
    }
});

router.post("/withdraw", async (req, res, next) => {
    try {
        let token = req.cookies.Namu;
        let decoded = jwt.verify(token, process.env.JWT_PWD);

        const connection = await mariadb.getConnection();
        const getter = await connection.query("select * from staking where id=? order by idx desc", [decoded]);
       
        const endTime = Date.now();
        const endTimeMoment = moment(endTime).format("YYYY-MM-DD HH:mm:ss");
        const interest = Math.floor((endTime - Date.parse(getter[0].startTime)) / 1000 / 60) * 10;

        const holomi = getter[0].ether * getter[0].rate * interest;
        
        await connection.query("update staking set holomi=?, endTime=?, state=? WHERE id=? order by idx desc limit 1", 
            [holomi, endTimeMoment, 0, decoded]
        );

        res.send({ success: true });
        connection.release();
    } catch (error) {
        console.log(error);
    }
});

router.post("/timelock", async (req, res, next) => {
    try {
        let token = req.cookies.Namu;
        let decoded = jwt.verify(token, process.env.JWT_PWD);

        const connection = await mariadb.getConnection();
        const queryResult = await connection.query("select rate, startTime from staking where id=? order by idx desc", [decoded]);
        
        const timeLock = queryResult[0].rate * 60 * 1000;
        const timeDiff = Date.now() - Date.parse(queryResult[0].startTime);

        if(timeDiff >= timeLock)
            res.send({ success: true });
        else
            res.send({ success: false });

        connection.release();
    } catch (error) {
        console.log(error);
    }
});

router.post("/getdata", async (req, res, next) => {
    try {
        let token = req.cookies.Namu;
        let decoded = jwt.verify(token, process.env.JWT_PWD);

        const connection = await mariadb.getConnection();
        const getData = await connection.query("select * from staking where id=? order by idx desc", [decoded]);
        const momentTime = moment(getData[0].startTime).format("YYYY-MM-DD  HH:mm:ss");
        
        const interest = Math.floor((Date.now() - Date.parse(getData[0].startTime)) / 1000 / 60) * 10;
        const holomi = getData[0].ether * getData[0].rate * interest;

        setTimeout(() => {
            res.send({
                ether: getData[0].ether,
                holomi: holomi,
                rate: getData[0].rate,
                startTime: momentTime,
                interest: interest/10
            });
        }, 600);
 
        connection.release();
    } catch (error) {
        console.log(error);
    }
});

router.post("/forcedWithdraw",async (req,res) => {
    try {
        let token = req.cookies.Namu;
        let decoded = jwt.verify(token, process.env.JWT_PWD);
    
        const connection = await mariadb.getConnection();
        const getData = await connection.query("select * from staking where id=? order by idx desc", [decoded]);
        const getData_idx = getData[0].idx;
        const endTime = Date.now();
        const endTimeMoment = moment(endTime).format("YYYY-MM-DD HH:mm:ss");
        await connection.query("update staking set holomi=?, endTime=?, state=? WHERE idx=?",[0,endTimeMoment,0,getData_idx]);
        res.send({ success: true });
        connection.release();
    } catch (error) {
        console.log(error);
    }

})


module.exports = router;