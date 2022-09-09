var request = require("request");
request('https://jsonplaceholder.typicode.com/todos/1', function (error, response, body) {
// Print the error if one occurred  
//console.error('error:', error); 
// Print the response status code if a response was received
//console.log('statusCode:', response && response.statusCode);
// Print the HTML for the Google homepage.
//console.log(parsedData); 
if(!error && response.statusCode == 200){
    var parsedData = JSON.parse(body);
    console.log("we conducted a DNA test and the results were...." + parsedData["completed"]);
} 
  
});
request('https://jsonplaceholder.typicode.com/photos', function(error, response, body){
    if(!error && response.statusCode == 200){
        var parsedData = JSON.parse(body);
        console.log(parsedData[0].title);
    }
})