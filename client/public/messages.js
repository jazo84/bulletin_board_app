$(document).ready(function(){
  $.ajax({
    method:"GET",
    url:'/api/messages',
  }).then(function(res){
    console.log(res);
    var newRow, messageTitle, messageBody;
    for(var i = 0; i < res.length; i++) {
      newRow = $('<tr>');
      messageTitle = $('<p>');
      messageBody = $('<p>');
      messageTitle.text(res[i].title);
      messageBody.text(res[i].body);
      newRow.append(messageTitle).append(messageBody);
      $('#cardBody').append(newRow);
    }
  });
});
