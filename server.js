var express = require('express');
var exphbs = require('express-handlebars');
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

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/webScraper");

app.get("/", function(req, res) {
  
  res.render("index");
});

app.get("/scrape", function(req, res) {

  axios.get("https://quillette.com").then(function(response) {

  var $ = cheerio.load(response.data);

  $("h3.entry-title, h2.entry-title").each(function(i, element) {
    
    var result = {};
  
    result.title = $(this)
    .text();
    result.link = $(this)
    .children("a")
    .attr("href");
    result.summary = $(this)
    .siblings("p.summary")
    .text();
 
    // Create a new Article using the 'result' object built from scraping
    db.Article.create(result)
      .then(function(dbArticle) {
        // View the added result in the console
        console.log('wacky', dbArticle);
      })
      .catch(function(err) {
        return res.json('Wowwwww!',err);
      });
  });
  // If we were successful scraping and save an Article, send a message to the client
  // res.send("Scrape Complete");
  res.redirect("/articles");
  
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every doc in the articles collection
  db.Article.find({})
  .then(function(dbArticle) {
    // if find articles, send them to the client
    res.render("index", { dbArticle: dbArticle } )
  })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  })
// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  //query that finds the matching one in our db
  db.Article.findOne({ _id: req.params.id })
  // ..and populate all of the notes associated with it
  .populate("note")
  .then(function(dbArticle) {
    // If we were able to successfully find an Article with the given id, send it back to the client
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  })
})

// Route for saving or updating a given Article's associated Note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
  .then(function(dbNote) {
    return db.Article.findOneAndUpdate({_id: req.params.id }, { note: dbNote._id}, { new: true });
  })
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  })
});

app.delete("/articles" , function(req, res) {
  db.Note.remove()
})
// Start the server
  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
