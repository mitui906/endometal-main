document.addEventListener('DOMContentLoaded', function(){
  
  // 終了ボタンに対してクリックイベントを設定
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', logout, false);

  // ボタンをクリックすると、ログイン画面へ移動する関数を設定
  function logout(){

    // 移動したいページのパスをformで飛ばす
    const form = document.getElementsByName('logoutForm');
    form[0].submit();

  };

}, false);