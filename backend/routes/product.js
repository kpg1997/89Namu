var express = require('express');
var router = express.Router();
const mariadb = require('./mariaDB');
const jwt = require('jsonwebtoken');

require('dotenv').config();

router.get('/', async (req, res, next) => {
    try {
        const conn = await mariadb.getConnection();
        const list = await conn.query("select * from productList order by no");
        conn.release();
        res.send({ list: list });
    } catch (error) {
        console.log(error)
    }

});

router.post("/buy", async (req, res, next) => {

    try {
        const data = req.body.data;
        const conn = await mariadb.getConnection();
        let token = req.cookies.Namu;
        let decoded = jwt.verify(token, process.env.JWT_PWD);
        const name = data.name;
        const price = data.price;
        await conn.query("insert into buyProduct (userId,name,price) values(?,?,?)", [decoded, name, price]);
        conn.release();
        res.send({ success: true });
    } catch (error) {
        console.log(error)
    }


})

module.exports = router;
