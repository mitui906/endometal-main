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

var v_userTable = Bookshelf.Model.extend({
	tableName: 'v_userTable'
});

router.get("/", (req, res) => {

});

router.post("/", (req, res, next) => {

	// 検索処理 userIndex:キーワード searchOption:検索条件
	var userIndex = req.body['index'];
	var searchOption = req.body['searchOption'];

	console.log(userIndex);

	if (userIndex) {

		// userIndex = "'%"+userIndex+"%'";

		v_userTable.query(function(qb) {
			qb.where('userIndex', 'LIKE', `%${userIndex}%`).orWhere('userName', 'LIKE', `%${userIndex}%`);
		})
        .fetchAll({debug: true})
        .then((collection) => {

			console.log(collection);

            var data = {
				title: 'ログインユーザー初期値マスター保守 - エンドウメタル工業 株式会社',
				userId: req.session.userId,
				menuBarBtns: ['終了(X)','設定(S)','拡大(Z)','縮小(O)','ヘルプ(H)'],
				content: collection.toArray(),
				noticeText: '',
				fnBtns: [
					{'fn':'F5','text':'クリア'},
					{'fn':'F9','text':'行終了'},
					{'fn':'F12','text':'左右矢印キーの動作切替'}
				]
			};
			res.render("user", data);

        }).catch((err) => {
			res.status(500).json({error: true, data: {message: err.message}});
        });

	} else {

		new v_userTable().fetchAll({debug: true}).then((collection) => {

			var data = {
				title: 'ログインユーザー初期値マスター保守 - エンドウメタル工業 株式会社',
				userId: req.session.userId,
				menuBarBtns: ['終了(X)','設定(S)','拡大(Z)','縮小(O)','ヘルプ(H)'],
				content: collection.toArray(),
				noticeText: '',
				fnBtns: [
					{'fn':'F5','text':'クリア'},
					{'fn':'F9','text':'行終了'},
					{'fn':'F12','text':'左右矢印キーの動作切替'}
				]
			};
			res.render("user", data);
		})
		.catch((err) => {
			res.status(500).json({error: true, data: {message: err.message}});
		});

	}

});

router.post("/search", (req, res, next) => {

	
});

router.get("/:id", (req, res) => {
	res.send(req.params.id +'のユーザー情報を取得しました')
});

module.exports = router;