const express = require("express");
const router = express.Router();
const mariadb = require("./mariaDB");
const moment = require("moment");
const jwt = require('jsonwebtoken');

require('dotenv').config();

router.get("/", async(req, res, next) => {
    try {
        const connection = await mariadb.getConnection();
        const treeList = await connection.query("select * from TreeToken where htr_state not in (1) order by  htr_id limit 5");

        for(let i = 0; i < treeList.length; i++)
            treeList[i].htr_time = moment(treeList[i].htr_time).format("YYYY-MM-DD HH:mm:ss");

        res.send(treeList);
        connection.release();
    } catch (error) {
        console.log(error);
    }
});

router.post("/buyingtree", async(req, res, next) => {
    try {
        const connection = await mariadb.getConnection();
        const body = req.body.data;
        const treeId = body.treeId;
        const account = body.account;

        let token = req.cookies.Namu;
        let decoded = jwt.verify(token, process.env.JWT_PWD);

        await connection.query("insert into swap (userId, userAddr, treeId) values(?,?,?)", [decoded, account, treeId]);
        await connection.query("update TreeToken set htr_userId=?, htr_state=? where htr_id=?", [decoded, 1, treeId]);

        res.send({ success: true });
        connection.release();
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;