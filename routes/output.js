const express = require("express");
const { type } = require("express/lib/response");
const router = express.Router();

router.get("/", (req, res) => {
});

router.post("/", (req, res, next) => {
	// マスター出力画面

	switch (req.body.jumpPass2) {
		case 'siire':
			title = '仕入先マスター出力';
			item = '仕入先';
			break;
		case 'genba':
			title = '現場マスター出力';
			item = '現場';
			break;
		case 'car':
			title = '車両マスター出力';
			item = '車両';
			break;
		case 'driver':
			title = '運転者マスター出力';
			item = '運転者';
			break;
		case 'field':
			title = '方面マスター出力';
			item = '方面';
			break;
		case 'carType':
			title = '車種マスター出力';
			item = '車種';
			break;
		case 'palette':
			title = 'パレットマスター出力';
			item = 'パレット';
			break;
		case 'user':
			title = 'ログインユーザー初期値マスター';
			item = 'ユーザー';
			break;
		case 'product':
			title = '品名マスター出力';
			item = '品名';
			break;
		case 'syomei':
			title = '証明書マスター出力';
			item = 'パターン';
			break;
		case 'market':
			title = '相場マスター出力';
			item = '品名';
			break;
		case 'tanka':
			title = '現場別単価マスター出力';
			item = '現場';
			break;
	}

	var data = {
		title: title,
		userId: req.session.userId,
		menuBarBtns: ['終了(X)', '設定(S)', 'ヘルプ(H)'],
		content: '',noticeText: '',
		fnBtns: [''],
		type: item
	};
	res.render("output", data);
});

module.exports = router;