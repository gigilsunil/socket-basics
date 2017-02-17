var moment = require('moment');
var now = moment();

/*console.log(now.format());
//console.log(now.subtract(1,'year'));
console.log(now.format("h:mm a"));
console.log(now.format("X")); // epoch converter  - timestamp in seconds
console.log(now.format("x"));*/ // - javascript timestamp in miilliseconds

var timestamp =  1487247352122; //javascript timestamp in miilliseconds
var tsmoment = moment.utc(timestamp); // to display in utc 

console.log(tsmoment.local().format("h:mm a")); //to display in local
