//Grab data from keys.js
require("dotenv").config();
var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
	id: process.env.SPOTIFY_ID,
	secret: process.env.SPOTIFY_SECRET
});


var client = new Twitter({
	consumer_key: keys.twitter.consumer_key,
	consumer_secret: keys.twitter.consumer_secret,
	access_token_key: keys.twitter.access_token_key,
	access_token_secret: keys.twitter.access_token_secret
  });



//Stored argument's array
//process[2] choses action, process[3] as search parameter for spotify or movie.
var userCommand = process.argv[2];
var secondCommand = process.argv[3];
//process multiple words. Triggers if user types anything more than the above console logged options and first parameter.
	for(i=4; i<process.argv.length; i++){
	    secondCommand += '+' + process.argv[i];
	}

function theGreatSwitch(){
	//action statement, switch statement to declare what action to execute.
	switch(userCommand){

		case 'my-tweets':
		fetchTweets();
		break;

		case 'spotify-this-song':
		spotifySong();
		break;

		case 'movie-this':
		aMovieForMe();
		break;

		case 'do-what-it-says':
		followTheTextbook();
		break;
		
	}
	console.log("Enter a Command: my-tweets spotify-this-song movie-this or do-what-it-say");
};
//functions/options
function fetchTweets(){
    console.log("Tweets headed your way!");
 
    //parameters for twitter function.
	var parameters = {
		screen_name: '@Raziel49814043',
		count: 20
	};
// console.log(parameters);
   
	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
	        for (i=0; i<tweets.length; i++) {
	            var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(returnedData);
				console.log("-------------------------");
				
	        }
	    };
        
    });
};//end fetchTweets;


function spotifySong(){
	console.log("Music for DAYS!");
	var searchTrack;
	if(secondCommand === undefined){
		searchTrack = "What's My Age Again?";
	}else{
		searchTrack = secondCommand;
	}
	//launch spotify search
	spotify.search({ type: 'track', query: searchTrack}, function(err, data) {
		if (err) {
		  return console.log('Error occurred: ' + err);
		}
	   
	//   console.log(data.tracks.items); 
	  console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
	  console.log("Album: " + data.tracks.items[0].album.name);
	  console.log("Play track at: " + data.tracks.items[0].external_urls.spotify);
	  });

// 	spotify
//   .search({ type: 'track', query:searchTrack })
// .then(function(err, response) {
// 	console.log(response);
// 	  if (err) {
// 		return console.log("Spotify error occurred: " + err);
// 	  }
// 	  console.log(
// 		"Here is info for the track '" +
// 		  songName +
// 		  "':\n-------------------------------------------------"
// 	  );
// 	  console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
// 	  console.log("Album: " + data.tracks.items[0].album.name);
// 	  console.log("Play track at: " + data.tracks.items[0].external_urls.spotify);

//   })
//   .catch(function(err) {
//     console.log(err);
//   });

};


//end spotifyMe

function aMovieForMe(){
	console.log("Netflix and Chill?");

	//same as above, test if search term entered
	var searchMovie;
	if(secondCommand === undefined){
		searchMovie = "Mr. Nobody";
	}else{
		searchMovie = secondCommand;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=long&tomatoes=true&r=json&apikey=fcf72c9c';
   	request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body)["Title"]);
	        console.log("Year: " + JSON.parse(body)["Year"]);
	        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
	        console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
        }
        console.log(searchMovie);
        // console.log(response);
    });
};//end aMovieForMe

function followTheTextbook(){
	console.log("Looking at random.txt now");
	fs.readFile("random.txt", "utf8", function(error, data) {
	    if(error){
     		console.log(error);
     	}else{

     	//split data, declare variables
     	var dataArr = data.split(',');
        userCommand = dataArr[0];
        secondCommand = dataArr[1];
        //if multi-word search term, add.
        for(i=2; i<dataArr.length; i++){
            secondCommand = secondCommand + "+" + dataArr[i];
        };
        console.log(data);
        //run action
		theGreatSwitch();
		
    	};//end else

    });//end readfile

};//end followTheTextbook

theGreatSwitch();

