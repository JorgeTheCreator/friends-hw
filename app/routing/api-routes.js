// LOAD DATA

var friends 	= require('../data/friends.js');

var friendsData = friends.friends;

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API GET Requests

	app.get('/api/friends', function(req, res){
		// console.log(friendsData);
		res.json(friendsData);
	});

	// API POST Requests

	app.post('/api/friends', function(req, res){

		var newUser = req.body;
        var diffs = [];
        if (friendsData.length < 1) {
            console.log("unable to do calculation; not enough users");
        } else {
            compareFriends(friendsData, newUser, diffs);
            var lowest = diffs[0];
            for (var i = 0; i < diffs.length; i++) {
                if (diffs[i] < lowest) {
                    lowest = diffs[i];
                }
            };
            var bestMatch = diffs.indexOf(lowest);
            res.send(friendsData[bestMatch]);
        };
        friendsData.push(newUser);
	});

	function compareFriends(friends, newUser, diffs) {
	    var curUserIndex = 0;
	    while (curUserIndex < friends.length) {
	        var totalDifference = 0;
	        for (var i = 0; i < newUser.scores.length; i++) {
	            totalDifference += Math.abs(parseInt(friends[curUserIndex].scores[i]) - parseInt(newUser.scores[i]));
	        }
	        diffs.push(totalDifference);
	        curUserIndex++;
	    }
	}
}
