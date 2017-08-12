// Importing Various Sources

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var omdb = require('omdb');

var request = require("request");

var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;

var twitterClient = new Twitter(twitterKeys);
var spotifyClient = new Spotify(spotifyKeys);

// Defining action from typing on keyboard
var action = process.argv[2];
// Initiates a function based on the action
if (action==="my-tweets")
{
	my_tweets();
}

else if (action==="spotify-this-song")
{
	spotify_this_song();
}
else if (action==="movie-this")
{
	movie_this();
}
else if (action==="do-what-it-says")
{
	do_what_it_says();
}
else 
{
	console.log("Invalid Input: USE my-tweets, spotify-this-song, movie-this, or do-what-it-says");
}

function my_tweets() {
	// set a variable equal to Twitter username as an object ex. var username = {screenname: exampleUsername }
	var username = {
		screen_name: 'Robert_Coding'
	}

	twitterClient.get('statuses/user_timeline', username, function (error, tweets, response)
	{
		if(!error && response.statusCode===200){
			for (var i=0; i<tweets.length; i++)
			{
       console.log(tweets[i].created_at);
       console.log(tweets[i].text);
     }
   }
 })
}

var sing = process.argv[3];
function spotify_this_song(sing) {
  
  spotifyClient.search({type:'track', query: sing, limit:1}, function(err, data){

    if(err){
      return console.error(err);
    }
    if (!err) {    
      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].name);
      console.log(data.tracks.items[0].href);
      console.log(data.tracks.items[0].album.name);
    }});
};

var movieName = process.argv[3];
function movie_this(movieName) {
	callOMDB(movieName);

	function callOMDB(movieName){
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + 
    "&y=&plot=short&apikey=40e9cece";

    request(queryUrl,function(error,response, body){
      if (!error && response.statusCode === 200) {
        console.log(JSON.parse(body).Title);
        console.log(JSON.parse(body).Year);
        console.log(JSON.parse(body).imdbRating);

        var rt_rating="";
        var ratings = JSON.parse(body).Ratings;
        for(var i=0; i< ratings.length; i++){
          if(ratings[i].Source == "Rotten Tomatoes"){
            rt_rating = ratings[i].Value;
          }
        }
        console.log(rt_rating);
        console.log(JSON.parse(body).Country);
        console.log(JSON.parse(body).Language);
        console.log(JSON.parse(body).Plot);
        console.log(JSON.parse(body).Actors);
      }
    });
  }
}


function do_what_it_says() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    
    var array = data.split(',');
    
    if (array[0]==="my-tweets")
    {
      my_tweets();
    }
    if (array[0]==="spotify-this-song")
    {
      spotify_this_song(array[1]);
    }

    if (array[0]==="movie-this")
    {
      movie_this(array[1]);
    }

    console.log(data);
  }
  )}