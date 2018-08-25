# Quillette News Scraper

*Homepage Header with button to begin web scrape*

![Screenshot](https://cl.ly/ae4e74cdf6f4/Image%2525202018-08-25%252520at%25252012.02.47%252520PM.png)

*Articles scraped from Quillette Magazine. Includes title with link to article and brief summary* 

![Screenshot](https://cl.ly/63ae048640c3/Image%2525202018-08-25%252520at%25252011.58.10%252520AM.png)

*Example of a saved note for specific article*

![Screenshot](https://cl.ly/40984fd23ad1/Image%2525202018-08-25%252520at%25252012.01.27%252520PM.png)

## Demo

This app has been deployed using Heroku in conjunction with mongolab. Access it [here](https://quillette-scraper.herokuapp.com/)

## Installing Locally
If you prefer to run the application locally, please ensure that you have installed Node.js and MongoDB, then take the following steps:
- Clone this repo locally with `git clone https://github.com/CavanWagg/mongoose-news-scraper.git`.
- Install NPM dependencies by running `npm install` in the project directory.
- Ensure that you have an active connection to MongoDB.
- `npm start` from the project directory.
- The application will be running at `localhost:3000/`.

## Instructions

* Press the "Scrape For Articles" button at the top of the page to scrape Quillette's web site for news articles. Any new articles will be added to the database
* A given article's title, web link, and brief summary will be displayed on the page for you to read or access.
* To add a note to an article, click the article's summary text to render a Notepad to the right of the page.
* You can save notes or delete an existing note from the database. 

## Tech utilized
* Mongoose
* Express
* Cheerio
* Handlebars
* Node

