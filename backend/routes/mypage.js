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

        const getProdData = await connection.query("select * from buyProduct where userId=?", [decoded]);
        const getTreeData = await connection.query("select * from TreeToken where htr_userId=?", [decoded]);
        const getStakingData = await connection.query("select * from staking where id=? order by idx", [decoded]);
        
        for(let i = 0; i < getTreeData.length; i++)
            getTreeData[i].htr_time = moment(getTreeData[i].htr_time).format("YYYY-MM-DD HH:mm:ss");
        for(let i = 0; i < getStakingData.length; i++) {
            getStakingData[i].startTime = moment(getStakingData[i].startTime).format("YYYY-MM-DD HH:mm:ss");
            
            if(getStakingData[i].state) {
                getStakingData[i].state = "Proceeding";
                getStakingData[i].holomi = "none";
                getStakingData[i].endTime = "none";
            }
            else {
                getStakingData[i].state = "Done";
                getStakingData[i].endTime = moment(getStakingData[i].endTime).format("YYYY-MM-DD HH:mm:ss");
            }
        }
        res.send({
            getProdData: getProdData,
            getTreeData: getTreeData,
            getStakingData: getStakingData
        });

        connection.release();
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
