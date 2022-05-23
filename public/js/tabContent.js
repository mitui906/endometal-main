document.addEventListener('DOMContentLoaded', function(){
  
  // タブに対してクリックイベントを適用
  const tabLabels = document.getElementsByClassName('tabLabel');
  for(let i = 0; i < tabLabels.length; i++) {
    tabLabels[i].addEventListener('click', tabSwitch, false);
  }

  // タブをクリックすると実行する関数
  function tabSwitch(){

    // コンテンツのclassの値を変更
    document.getElementsByClassName('activeCnt')[0].classList.remove('activeCnt');
    const arrayTabs = Array.prototype.slice.call(tabLabels);
    const index1 = arrayTabs.indexOf(this);
    document.getElementsByClassName('tabContent')[index1].classList.add('activeCnt');

  };

}, false);