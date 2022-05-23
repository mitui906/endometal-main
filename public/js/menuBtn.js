document.addEventListener('DOMContentLoaded', function(){
  
  // ボタンに対してクリックイベントを設定
  const menu3Btns = document.getElementsByClassName('menu3Btn');
  for(let i = 0; i < menu3Btns.length; i++) {
    menu3Btns[i].addEventListener('click', jump, false);
  }

  // ボタンをクリックすると、別画面へ移動する関数を設定
  function jump(){

		// クリックしたボタンに応じてjumpPassを変更
		// クリックしたボタンのname名がパスになるように設定しておく
		const jumpPass = document.getElementsByName('jumpPass');
		jumpPass[0].value = this.attributes.name.nodeValue;
    const jumpPass2 = document.getElementsByName('jumpPass2');
    jumpPass2[0].value = this.id;

    // 移動したいページのパスをformで飛ばす
    const form = document.getElementsByName('jumpForm');
		form[0].action = jumpPass[0].value;
    form[0].submit();

  };

}, false);