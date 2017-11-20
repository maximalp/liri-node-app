// all modules requirements installed and called from NPM
var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
//var omdb = require('omdb');
var fs = require("fs");


//var inquirer = require("inquirer");

//var {twitterKeys, spotifyKeys} = require("./keys.js");
//var spotifyKeys = require("./keys.js");

var keys = require("./keys.js");



var toDo = (process.argv[2]);



var client = new Twitter(
  keys.twitterKeys
);


// Creating switch-case statement (if-then would also work).
// The switch-case will direct which function gets run when asking Liri for output.
switch (toDo) {
  case "my-tweets":
    tweetCall();
    break;

  case "spotify-this-song":
    spotifyId();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    randomDo();
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

function spotifyId()
{
  var spotify = new Spotify({
   id: keys.spotifyKeys.client_id,
   secret: keys.spotifyKeys.client_secret
});

var songName = process.argv[3];
if (!songName){
        songName = "The Sign";
      }

spotify.search({ type: 'track', query: songName}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  console.log("The artist is: " + data.tracks.items[0].album.artists[0].name);
  console.log("Your song was: " + data.tracks.items[0].name);
  console.log("The album was: " + data.tracks.items[0].album.name);
  console.log("Preview of album: " + data.tracks.items[0].album.href);

});


};

function movie()
{

var movieName = process.argv[3];

if (!movieName){
        movieName = "Mr.Nobody";
      };

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + keys.omdbKey.key;


console.log(movieName);
// This line is just to help us debug against the actual URL.
// console.log(queryUrl); //testing finished

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Movie Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

    console.log("Additional Movie Rating: " + JSON.parse(body).Metascore);

    console.log("Country Where Produced: " + JSON.parse(body).Country);
    console.log("Language of Movie: " + JSON.parse(body).Language);
    console.log("Plot of the Movie: " + JSON.parse(body).Plot);
    console.log("Actors in the Movie: " + JSON.parse(body).Actors);

  }
});

}; //end movie function

function randomDo()
{

  fs.readFile('random.txt', "utf8", function(error, data)
    {
      console.log(data);

        var result = data.split(",");
        var action = result[0];
        var paramName = result[1];
        console.log(action);
        console.log(paramName);

        switch (action) {
               case "my-tweets":
                 mytweets();
                 break;

               case "spotify-this-song":
                 spotifyId(paramName);
                 break;

               case "movie-this":
                 movie(paramName);
                 break;
    };

  });





}; // end randomDo function
