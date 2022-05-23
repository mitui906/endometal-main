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

var siireTable = Bookshelf.Model.extend({
	tableName: 'siireTable'
});

router.get("/", (req, res) => {
	console.log("user");
	res.send("ユーザーページです");
});

router.post("/", (req, res, next) => {

    // 仕入明細入力画面
    var data = {
        title: '仕入明細入力',
        userId: req.session.userId,
        menuBarBtns: ['終了(X)', '設定(S)', '拡大(Z)', '縮小(O)', 'ヘルプ(H)'],
        noticeText: '',
        fnBtns: [
            {'fn':'F5','text':'クリア'},
            {'fn':'F9','text':'行終了'},
            {'fn':'F12','text':'左右矢印キーの動作切替'}
        ]
    };
    res.render("siire", data);

});




module.exports = router;