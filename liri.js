require("dotenv").config();//this loads the .env 

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var cmd = process.argv[2];
var cmdArgument = process.argv[3];
var spotify = require('node-spotify-api');
var spotify = new spotify(keys.spotify);

console.log(process.argv[2])

var dataInfo;
switch (cmd) {
    case "concert-this":
        dataInfo = cmdArgument
        handleBandsIntown(cmdArgument);
        break;
    case "spotify-this-song":
        dataInfo = cmdArgument
        handleSpotify(cmdArgument);
        break;
    case "movie-this":
        dataInfo = cmdArgument
        handleOMDB(cmdArgument);
        break;
    case "do-what-it-says":
        dataInfo = cmdArgument
        handleDoWhat(cmdArgument);
        break;
}

console.log(`Command Passed: ${dataInfo}`)


function handleBandsIntown(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < cmdArgument.length; i++) {
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city);
                console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));

            }
        })
}

function handleSpotify(songName){
    spotify
  .search({ type: 'track', query: songName })
  .then(function(response) {
          // console.log(response.tracks);
    for (var i = 0; i < response.tracks.items.length; i++) {
    console.log("Artist(s): " + response.tracks.items[i].artists[0].name);
    console.log("Song Title: " + response.tracks.items[i].name);
    console.log("Preview Link: " + response.tracks.items[i].preview_url);
    console.log("Album: " + response.tracks.items[i].album.name);
    } 
})

  .catch(function(err) {
    console.log(err);
  });
}

function handleOMDB(title){
    if(title ==""){
        title="Mr.Nobody"
    }
    axios.get('http://www.omdbapi.com/?apikey=a276d5c2&t=' + title)
    .then(function (response) {
        if(response.data.Ratings[1] === undefined){
            console.log("Rotten Tomatoe Rating: NA" );
        }
        else{
            console.log("Rotten Tomatoe Rating: " + response.data.Ratings[1].Value);
        }

      // handle success
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

function handleDoWhat(){

fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
//   console.log(data);
  

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");
  handleSpotify(dataArr[1]);

  // We will then re-display the content as an array for later use.
  console.log(dataArr);

});

}


// function logData(){
//     fs.appendFile("log.txt", text, function(err) {

//         // If an error was experienced we will log it.
//         if (err) {
//           console.log(err);
//         }
      
//         // If no error is experienced, we'll log the phrase "Content Added" to our node console.
//         else {
//           console.log("Content Added!");
//         }
      
//       });
// }
