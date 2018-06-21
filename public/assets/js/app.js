
// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // for each one
  for (var i = 0; i < data.length; i++) {
    // Display the article information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].summary + "</p")
  }
});

$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
  // now, add the note information to the page
  .then(function(data) {
    console.log('app line 23', data);
    // The title of the article
    $("#notes").append(`<h2> + ${data.title} + </h2>`)
    $("#notes").append(`<input id='titleInput' name='title' >`)
    $("#notes").append(`<textarea id='bodyInput' name='body'></textarea>`);
    $("#notes").append(`<button data-id=${data._id} id='savenote'>Save Note</button>`)
    $("#notes").append(`<button data-id=${data._id} id='deletenote'>Delete Note</button>`)


    // If there's a note in the article
    if (data.note) {
      // Place the title of the note in the title input
      $('#titleInput').val(data.note.title);
      // Place the body of the note in the body textarea
      $("#bodyInput").val(data.note.body);
    }
  });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  
// Run a POST request to change the note, using what's entered in the inputs
$.ajax({
  method: "POST",
  url: "/articles/" + thisId,
  data: {
    // Value taken from title input
    title: $("#titleInput").val(),
    // Value taken from note textarea
    body: $("#bodyInput").val()
  }
})

// With that done
.then(function(data) {
  // log the response
  console.log('line 61', data);
  // Empty the notes section
  $("#notes").empty();
});

// remove the values entered in the input and textarea for note entry
$("#titleInput").val("");
$('#bodyInput').val("");
});