function deleteNote(id){
  var ajaxRequest = {
    url: '/notes/' + id,
    method: 'delete',
    success: function () {
      window.location.reload();
    }
  };
  $.ajax(ajaxRequest)
}

function sendAlert() {
  alert("Hello from customJS.js");
}

// function newHeadline(){
//     $("#div1").load("/newHeader.txt");
// }