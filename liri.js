require("dotenv").config();
var axios = require('axios');
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.keys.spotify);
var bands = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
var fs = require("fs");
var request = require("request");
var filename = './log.txt';
//write output console
var log = require('simple-node-logger').createSimpleFileLogger(filename);
log.setLevel('all');

//input parameters like movie title and track name and stuff
var userCommand = process.argv[2];
var secondCommand = process.argv[3];


console.log(keys.keys.spotify);
var getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "What's my age again";
    }

    spotify.search(
        {
            type: "track",
            query: userCommand
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};




var getArtistNames = function (artist) {
    return artist.name;
};

function mySwitch(userCommand) {

    switch (userCommand) {
        case "bands-in-town":
            getBands();
            break;
        case "spotify-this-song":
            getSpotify();
            break;
        case "movie-this":
            getMovie();
            break;
        case "do-what-it-says":
            doWhat();
            break;
    }
    function getMovie() {
        var movieName = secondCommand;
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                var body = JSON.parse(body);

                logOutput('================ Movie Info ================');
                logOutput("Title: " + body.Title);
                logOutput("Release Year: " + body.Year);
                logOutput("IMdB Rating: " + body.imdbRating);
                logOutput("Country: " + body.Country);
                logOutput("Language: " + body.Language);
                logOutput("Plot: " + body.Plot);
                logOutput("Actors: " + body.Actors);
                logOutput("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
                logOutput("Rotten Tomatoes URL: " + body.tomatoURL);
                logOutput('==================THE END=================');

            } else {
                console.log("Error occurred.")
            }
            
            if (movieName === "Mr. Nobody") {    //if nothing is entered
                console.log("-----------------------");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
            }
        });
    }

    function doWhat() {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (!error);
            console.log(data.toString());
            //i hope this works
            var cmds = data.toString().split(',');
        });
    }



}   
mySwitch(userCommand);

//get user input
//Determine if user input is either movie-this, spotify-this or bands-this
//if its movies-this 
    // make an axios call to omdb data base
//if its spotify-this use the spotify npm package to make a spoitfy call to the spotify data base
//if its bands in town-this use axios to call to bands in town api
// if it the other do thing use nodes built in file system package to read the reandom.txt
