$(document).ready(function(){
  $.ajax({
    method:"GET",
    url:'/api/messages',
  }).then(function(res){
    console.log(res);
    var newRow, messageTitle, messageBody;
    for(var i = 0; i < res.messages.length; i++) {
      newRow = $('<tr class="row">');
      messageTitle = $('<p id="title">');
      messageBody = $('<p id="messBody">');
      messageTitle.text(res.messages[i].title);
      messageBody.text(res.messages[i].body);
      newRow.append(messageTitle).append(messageBody);
      $('#cardBody').append(newRow);
    }
  });
});
