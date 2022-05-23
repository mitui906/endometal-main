const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	var data = {
		title: '',
		userId: 'userId',
		content: '',
		menuBarBtns: ['終了(X)'],
    noticeText: '【日報入力完了】ドライバー：田中太　処理番号：000001　仕入先：○○株式会社【日報入力完了】ドライバー：松本　処理番号：000005　仕入先：○○株式会社【仕入情報追加】処理番号：000014　仕入先：○○株式会社【仕入情報追加】処理番号：000015　仕入先：○○株式会社【日報未入力】ドライバー：伊藤太　処理番号：000003　仕入先：○○株式会社【日報未入力】ドライバー：斎藤　処理番号：000006　仕入先：○○株式会社',
		fnBtns: [
			{'fn':'F2','text':'現場マスタ保守'},
			{'fn':'F3','text':'マスター検索'},
			{'fn':'F4','text':'完了切替'},
			{'fn':'F5','text':'クリア'},
			{'fn':'F6','text':'配車変更'},
			{'fn':'F7','text':'仕入修正'},
			{'fn':'F9','text':'最新の情報に更新'},
			{'fn':'F11','text':'配車取消'},
			{'fn':'F12','text':'日報入力'}
		]
	};
	res.render("haisya", data);
});

router.get("/info", (req, res) => {

});

router.get("/:id", (req, res) => {

});

module.exports = router;