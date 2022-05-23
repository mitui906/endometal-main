const express = require("express");
const router = express.Router();

var knex = require('knex')({
	client: 'postgresql',
	connection: {
    host    : '192.168.0.161',
    user    : 'postgres',
    password: '2323',
    database: 'endometal',
    charset : 'utf8',
    port: 5432
	}
});

var Bookshelf = require('bookshelf')(knex);

var carTypeTable = Bookshelf.Model.extend({
	tableName: 'carTypeTable'
});

router.get("/", (req, res) => {
	console.log("user");
	res.send("ユーザーページです");
});

router.post("/", (req, res, next) => {

    // 車種マスター保守
    var data = {
        title: '車種マスター保守',
        userId: req.session.userId,
        menuBarBtns: ['終了(X)', '設定(S)', '拡大(Z)', '縮小(O)', 'ヘルプ(H)'],
        content: collection.toArray(),
        noticeText: '',
        fnBtns: [
            {'fn':'F5','text':'クリア'},
            {'fn':'F9','text':'行終了'},
            {'fn':'F12','text':'左右矢印キーの動作切替'}
        ]
    };
    res.render("carType", data);

});


module.exports = router;