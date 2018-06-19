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
    console.log(data);
    // The title of the article
    $("#notes").append(`<h2> + ${data.title} + </h2>`)
    $("#notes").append(`<input id='titleInput' name='title' >`)
    $("#notes").append(`<textarea id='bodyInput' name='body'></textarea>`);
    $("#notes").append(`<button data-id=${data._id} id='savenote'>Save Note</button>`)

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
})