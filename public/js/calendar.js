document.addEventListener('DOMContentLoaded', function(){
  
  // ボタンに対してクリックイベントを設定
  const selectDate = document.getElementsByClassName('calender-center');
  for(let i = 0; i < selectDate.length; i++) {
    selectDate[i].addEventListener('click', jumpHaisya, false);
  }

  // ボタンをクリックすると、配車計画画面へ移動する関数を設定
  function jumpHaisya(){

		// クリックしたボタンに応じてパラメータを変更
		// クリックしたボタンのid名がパラメータになるように設定しておく
		const selectDateParam = document.getElementsByName('selectDateParam');
		selectDateParam[0].value = this.id;

    const form = document.getElementsByName('jumpHaisyaForm');
    form[0].submit();

  };

}, false);