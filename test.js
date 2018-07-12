//Grab data from keys.js
require("dotenv").config();
var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');
// var client = new Twitter();



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
		spotifyMe();
		break;

		case 'movie-this':
		aMovieForMe();
		break;

		case 'do-what-it-says':
		followTheTextbook();
		break;
		
	}
};
//functions/options
function fetchTweets(){
    console.log("Tweets headed your way!");
    
	
    
    //parameters for twitter function.
	var parameters = {
		screen_name: 'multishifties',
		count: 20
	};
console.log(parameters);
    //call the get method on our client variable twitter instance
    client.get(path, params, callback);
    client.post(path, params, callback);
    client.stream(path, params, callback);

    client.get('favorites/list', function(error, tweets, response) {
        if(error) throw error;
        console.log(tweets);  // The favorites.
        console.log(response);  // Raw response object.
      });
console.log(tweets);

	// client.get('statuses/user_timeline', parameters, function(error, tweets, response){
	// 	if (!error) {
	//         for (i=0; i<tweets.length; i++) {
	//             var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	//             console.log(returnedData);
	//             console.log("-------------------------");
	//         }
	//     };
    //     console.log(tweets);
    // });
};//end fetchTweets;

function spotifyMe(){
	console.log("Music for DAYS!");

    // var spotify = new Spotify(keys.spotify);

	//variable for search term, test if defined.
	var searchTrack;
	if(secondCommand === undefined){
		searchTrack = "What's My Age Again?";
	}else{
		searchTrack = secondCommand;
	}
	//launch spotify search
	spotify.search({type:'track', query:searchTrack}, function(err,data){
	    if(err){
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	        //tried searching for release year! Spotify doesn't return this!
	  		// console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        // console.log("Song: " + data.tracks.items[0].name);
	        // console.log("Album: " + data.tracks.items[0].album.name);
	        // console.log("Preview Here: " + data.tracks.items[0].preview_url);
            console.log(data);
        }
	});
    console.log(secondCommand);
};//end spotifyMe

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

