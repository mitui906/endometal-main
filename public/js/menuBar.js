document.addEventListener('DOMContentLoaded', function(){
  
  // ボタンに対してクリックイベントを設定
  const menuBarBtns = document.getElementsByClassName('menuBarBtn');
  for(let i = 0; i < menuBarBtns.length; i++) {
    menuBarBtns[i].addEventListener('click', backMainMenu, false);
  }

  // ボタンをクリックすると、別画面へ移動する関数を設定
  function backMainMenu(){

    // サブミットしてメインメニュー画面へ戻る
    const form = document.getElementsByName('backMainMenuForm');
    form[0].submit();

  };

}, false);