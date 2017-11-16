var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

var fs = require("fs");
//var inquirer = require("inquirer");

var twitterKeys = require("./keys.js");

var toDo = (process.argv[2]);



var client = new Twitter(
  twitterKeys
);


// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (toDo) {
  case "my-tweets":
    tweetCall();
    break;

  case "spotify-this-song":
    music();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    doit();
    break;
}

function tweetCall()
{

var params = {screen_name: 'codetestfun', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (i=0; i<tweets.length; i++)
    {
    console.log("The following Tweet: " + tweets[i].text + " was made on " + tweets[i].created_at + " .");
    }

  }
  else {
  console.log(error);
  }
});
};
