$(function(){
  // カテゴリーセレクトボックスのオプションを作成
  function appendOption(category){
    var html = `<option value="${category.name}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }
  // 子カテゴリーの表示作成
  function appendChidrenBox(insertHTML){
    var childSelectHtml = '';
    childSelectHtml = 
    ` <div class="category-container" id= "children_wrapper" >
        <i id = icon1 class="fa fa-chevron-down"></i>
        <select class= "category-container__select" id="c2" name="item[categorie][categorie]" >
          <option value="---" data-category="---">---</option>
            ${insertHTML}
        <select>
      </div>`;
    $('.listing-select-wrapper').append(childSelectHtml);
  }
  // 孫カテゴリーの表示作成
  function appendGrandchidrenBox(insertHTML){
    var grandchildSelectHtml = '';
    grandchildSelectHtml =
    `<div class="category-container" id= "grandchildren_wrapper" >
      <i id = icon1 class="fa fa-chevron-down"></i>
      <select class= "category-container__select" id="c3" name="item[categorie][categorie]" >
        <option value="---" data-category="---">---</option>
          ${insertHTML}
      <select>
    </div>`; 
    $('.listing-select-wrapper').append(grandchildSelectHtml);
  }
  // 親カテゴリー選択後のイベント
  $('#c1').on('change', function(){
    var parentCategory = document.getElementById('c1').value; //選択された親カテゴリーの名前を取得
    if (parentCategory != "---"){ //親カテゴリーが初期値でないことを確認
      $.ajax({
        url: '/items/get_category_children',
        type: 'GET',
        data: {parent_name: parentCategory},
        dataType: 'json'
      })
      .done(function(children){
        $('#children_wrapper').remove(); //親が変更された時、子以下を削除する
        $('#grandchildren_wrapper').remove();
        var insertHTML = '';
        children.forEach(function(child){
          insertHTML += appendOption(child);
        });
        appendChidrenBox(insertHTML);
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#children_wrapper').remove(); //親カテゴリーが初期値になった時、子以下を削除する
      $('#grandchildren_wrapper').remove();
    }
  });
  // 子カテゴリー選択後のイベント
  $('.listing-select-wrapper').on('change', '#c2', function(){
    var childId = $('#c2 option:selected').data('category');//選択された子カテゴリーのidを取得
    if (childId != "---"){ //子カテゴリーが初期値でないことを確認
      $.ajax({
        url: '/items/get_category_grandchildren',
        type: 'GET',
        data: { child_id: childId },
        dataType: 'json'
      })
      .done(function(grandchildren){
        if (grandchildren.length != 0) {
          $('#grandchildren_wrapper').remove(); //子が変更された時、孫以下を削除する
          var insertHTML = '';
          grandchildren.forEach(function(grandchild){
            insertHTML += appendOption(grandchild);
          });
          appendGrandchidrenBox(insertHTML);
        }
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#grandchildren_wrapper').remove(); //子カテゴリーが初期値になった時、孫以下を削除する
    }
  });
});