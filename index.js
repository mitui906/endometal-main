const collection = require("bookshelf/lib/collection");
const express = require("express");
const bodyParser = require('body-parser');
const userRouter = require("./routes/user");
const haisyaRouter = require("./routes/haisya");
const outputRouter = require("./routes/output");
const siireRouter = require("./routes/siire");
const carTypeRouter = require("./routes/carType");
const session = require("express-session");
const req = require("express/lib/request");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

var knex = require('knex')({
    client: 'postgresql',
    connection: {
        host: '192.168.0.161',
        user: 'postgres',
        password: '2323',
        database: 'endometal',
        charset: 'utf8',
        port: 5432
    }
});

var session_opt = {
    secret: 'Keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
};

var Bookshelf = require('bookshelf')(knex);

var settingTable = Bookshelf.Model.extend({
    tableName: 'settingTable'
});

var userTable = Bookshelf.Model.extend({
    tableName: 'userTable'
});

var fieldMasterTable = Bookshelf.Model.extend({
    tableName: 'fieldMasterTable'
});


app.use(session(session_opt));
app.use(mylogger);
app.use(express.static("public"));
app.set("view engine", "ejs");



app.get("/", (req, res) => {

    if (req.session.userId != undefined) {
        // セッション情報があればメインメニューを開く
        new settingTable().fetchAll().then((collection) => {
            var data = {
                title: '',
                userId: 'userId',
                content: collection.toArray(),
                menuTabs: 'menu1'
            };
            res.render("index", data);
        })
        .catch((err) => {
            res.status(500).json({ error: true, data: { message: err.message } });
        });
    } else {
        // セッション情報がなければログイン画面へ
        var data = {
            message: "IDとパスワードを入力してください"
        }
        res.render("login", data);
    }

});


app.post("/login", (req, res, next) => {
    // ユーザー情報照会
    var userId = req.body['userId'];
    var password = req.body['password'];

    userTable.query({ where: { userId: userId }, andWhere: { password: password } })
        .fetch({debug: true})
        .then((collection) => {
            var userData = collection;

            // 検索結果をセッションに保存
            req.session.code = userData.attributes.code;
            req.session.userId = userData.attributes.userId;
            req.session.userName = userData.attributes.userName;
            req.session.userNameDisplay = userData.attributes.userNameDisplay;
            req.session.userIndex = userData.attributes.userIndex;
            req.session.adminFlag = userData.attributes.adminFlag;
            req.session.uketukeFlag = userData.attributes.uketukeFlag;
            req.session.haisyaFlag = userData.attributes.haisyaFlag;
            req.session.sikiriFlag = userData.attributes.sikiriFlag;
            req.session.siharaiFlag = userData.attributes.siharaiFlag;
            req.session.driverFlag = userData.attributes.driverFlag;
            req.session.CarCode = userData.attributes.CarCode;
            req.session.driverBiko = userData.attributes.driverBiko;
            req.session.haisyaClass = userData.attributes.haisyaClass;
            req.session.officeCode = userData.attributes.officeCode;
            req.session.safeOfficeCode = userData.attributes.safeOfficeCode;
            req.session.noticeCustom1 = userData.attributes.noticeCustom1;
            req.session.noticeCustom2 = userData.attributes.noticeCustom2;
            req.session.noticeCustom3 = userData.attributes.noticeCustom3;
            req.session.noticeCustom4 = userData.attributes.noticeCustom4;
            req.session.searchFlag = userData.attributes.searchFlag;

            // ユーザー情報が正確の場合、メインメニューを開く
            new settingTable().fetchAll({debug: true}).then((collection) => {
                var data = {
                    title: '',
                    userId: req.session.userId,
                    content: collection.toArray(),
                    menuTabs: 'menu1'
                };
                res.render("index", data);
            })
            .catch((err) => {
                res.status(500).json({ error: true, data: { message: err.message } });
            });
        }).catch((err) => {
            // ユーザー情報に間違いがあれば、ログイン画面へ
            var data = {
                message: "IDまたはパスワードが正しくありません"
            }
            res.render("login", data);
        });
});


app.post('/logout', (req, res, next) => {
    // セッションを破棄してログアウト
    req.session.destroy((err) => {
        var data = {
            message: "IDとパスワードを入力してください"
        }
        res.render("login", data);
    });
});


app.post("/", (req, res, next) => {

    // メニュー画面1と2の切替
    var menuTabNum = req.body.menuTab;
    if (menuTabNum == 1) {
        menuTabs = "menu2";
    } else {
        menuTabs = "menu1";
    }

    new settingTable().fetchAll({debug: true}).then((collection) => {
        var data = {
            title: '',
            userId: req.session.userId,
            content: collection.toArray(),
            menuTabs: menuTabs
        };
        res.render("index", data);
    })
    .catch((err) => {
        res.status(500).json({ error: true, data: { message: err.message } });
    });
});


app.post("/haisyaCalender", (req, res, next) => {
    // 配車処理カレンダー画面
    var data = {
        title: '配車処理カレンダー',
        userId: req.session.userId,
        menuBarBtns: ['終了(X)'],
        noticeText: '【日報入力完了】ドライバー：田中太　処理番号：000001　仕入先：○○株式会社【日報入力完了】ドライバー：松本　処理番号：000005　仕入先：○○株式会社【仕入情報追加】処理番号：000014　仕入先：○○株式会社【仕入情報追加】処理番号：000015　仕入先：○○株式会社【日報未入力】ドライバー：伊藤太　処理番号：000003　仕入先：○○株式会社【日報未入力】ドライバー：斎藤　処理番号：000006　仕入先：○○株式会社',
        fnBtns: ''
    };
    res.render("haisyaCalender", data);
});


app.post("/siireMaster", (req, res, next) => {
    // 仕入先マスター保守画面
    var data = {
        title: '仕入先マスター保守',
        userId: req.session.userId,
        menuBarBtns: ['終了(X)', '設定(S)', 'ヘルプ(H)'],
        noticeText: '',
        fnBtns: ''
    };
    res.render("siireMaster", data);
});


app.post("/genbaMaster", (req, res, next) => {

    // 現場マスター保守画面
    var data = {
        title: '現場マスター保守',
        userId: req.session.userId,
        menuBarBtns: ['終了(X)', '設定(S)', 'ヘルプ(H)'],
        noticeText: '',
        fnBtns: [
            { 'fn': 'F5', 'text': 'クリア' },
            { 'fn': 'F9', 'text': '以下省略' }
        ]
    };
    res.render("genbaMaster", data);

});

app.post("/fieldMaster", (req, res, next) => {


    new fieldMasterTable().fetchAll({debug: true}).then((collection) => {
        // 方面マスター保守画面
        var data = {
            title: 'ログインユーザー初期値マスター保守 - エンドウメタル工業 株式会社',
            userId: req.session.userId,
            menuBarBtns: ['終了(X)', '設定(S)', '拡大(Z)', '縮小(O)', 'ヘルプ(H)'],
            content: collection.toArray(),
            noticeText: '',
            fnBtns: [
                { 'fn': 'F5', 'text': 'クリア' },
                { 'fn': 'F9', 'text': '行終了' },
                { 'fn': 'F12', 'text': '左右矢印キーの動作切替' }
            ]
        };
        res.render("fieldMaster", data);
    })
    .catch((err) => {
        res.status(500).json({ error: true, data: { message: err.message } });
    });

});



//ルーティング
app.use("/user", userRouter);
app.use("/haisya", haisyaRouter);
app.use("/output", outputRouter);
app.use("/siire", siireRouter);
app.use("/carType", carTypeRouter);



//ミドルウェア
function mylogger(req, res, next) {
    console.log(req.originalUrl);
    next();
};


const PORT = 3000;
app.listen(PORT, () => console.log("サーバーが起動しました"));
