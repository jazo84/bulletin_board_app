$(document).ready(function(){

  $('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTitle = $('#formGroupTitle').val();
    var messageBody = $('#formControlMessage').val();
    var messageObj = { messageTitle: messageTitle, messageBody: messageBody}

    $.ajax({
      method:'POST',
      url:'/api/message',
      dataType:'json',
      data: JSON.stringify(messageObj),
      contentType:'application/json',
      success:function(res){
      console.log(res);
      if(res === "null_message"){
        alert("Title and message fields can not be blank")
      } else {
        appendMessageBoard();
        alert('Your Message has been added to the message board')
      }
      $('#formGroupTitle').val("");
      $('#formControlMessage').val("");
    }
  });
});
  function appendMessageBoard() {
    $.ajax({
      method:'GET',
      url:'/api/messages'
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
        $('#cardDiv').append(newRow);
      }
    });
  };
  appendMessageBoard();
});
