var express = require('express');
var router = express.Router();
const mariadb = require('./mariaDB');


router.post('/setTreeToken', async (req, res, next) => {
    let {tokenId,x,y,amount,imgHash} = req.body.data;
    try {
        const conn = await mariadb.getConnection();
        for(let i =0; i<amount;i++){
            await conn.query("insert into TreeToken (htr_id, htr_X, htr_y, htr_imgHash) values(?,?,?,?)",[tokenId,x,y,imgHash]);
            tokenId++;
        }
        conn.release();
        res.send({success:true});
    } catch (e) {
        console.log(e.message);
    }
});


module.exports = router;