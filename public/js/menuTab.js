document.addEventListener('DOMContentLoaded', function(){
  
  // タブに対してクリックイベントを適用
  const menuBtns = document.getElementsByClassName('menuBtn');
  for(let i = 0; i < menuBtns.length; i++) {
    menuBtns[i].addEventListener('click', btnSwitch, false);
  }

  // タブをクリックすると実行する関数
  function btnSwitch(){
    // タブのclassの値を変更
    document.getElementsByClassName('active')[0].classList.remove('active');
    this.classList.add('active');
    // コンテンツのclassの値を変更
    document.getElementsByClassName('show')[0].classList.remove('show');
    document.getElementsByClassName('showTitle1')[0].classList.remove('showTitle1');
    document.getElementsByClassName('showTitle2')[0].classList.remove('showTitle2');
    const arrayTabs = Array.prototype.slice.call(menuBtns);
    const index1 = arrayTabs.indexOf(this);
    document.getElementsByClassName('mainMenuItem2')[index1].classList.add('show');
    document.getElementsByClassName('menuTitle')[index1].classList.add('showTitle1');
    document.getElementsByClassName('mainMenuItem1')[index1].classList.add('showTitle2');

  };

  // メニュー画面切替(menu1とmenu2を切替)
  var nextMenuBtn = document.getElementById('nextMenuBtn');
  nextMenuBtn.addEventListener('click', nextMenu, false);

  function nextMenu() {
    const form = document.getElementById('nextMenuForm');
    form.submit();
  }

}, false);