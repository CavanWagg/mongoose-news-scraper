var express = require('express');
var expressHbrs = require('express-handlebars');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var request = require('request');
var logger = require("morgan");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScraper");

app.get("/", function(req, res) {
  


  axios.get("https://quillette.com").then(function(response) {

  var $ = cheerio.load(response.data);

  $("h3.entry-title, h2.entry-title").each(function(i, element) {
    
    var result = {};
  
    result.title = $(this)
    .text();
    result.link = $(this)
    .children("a")
    .attr("href");
 
    // Create a new Article using the 'result' object built from scraping
    db.Article.create(result)
      .then(function(dbArticle) {
        // View the added result in the console
        console.log(dbArticle);
      })
      .catch(function(err) {
        return res.json(err);
      });
  });
  // If we were successful scraping and save an Article, send a message to the client
  res.send("Scrape Complete");
  });
});


  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
