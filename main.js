const expressApp = require('./index');
const electron = require('electron');

// アプリケーションをコントロールするモジュール
const eleApp = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

// 全てのウィンドウが閉じたら終了
eleApp.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    eleApp.quit();
  }
});

// Electronの初期化完了後に実行
eleApp.on('ready', () => {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({
		width: 1180,
		height: 820
	});
  mainWindow.setMenu(null);

  mainWindow.loadURL('http://127.0.0.1:3000');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', () => {
    mainWindow = null
  });
});