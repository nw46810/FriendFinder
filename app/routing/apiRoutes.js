var friends= require('../data/friends.js');

module.exports = function(app){

	// GET Request

	app.get('/api/friends', function(req, res){
		res.json(friends);
	});

	// POST Request

	app.post('/api/friends', function(req, res){
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

		var userData 	= req.body;
		var userName 	= userData.name;
		var userPhoto 	= userData.photo;
		var userScores 	= userData.scores;

		var totalDifference = 0;

		for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			//loop through all the scores of each friend
			for (var j=0; j< friends[i].scores[j]; j++){

				//calculate the difference between the scores then sum into the totalDifference
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// If the sum of differences is less then the differences of the current "best match"
				if (totalDifference <= bestMatch.friendDifference){

					// Reset the bestMatch to be the new friend. 
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		// Finally save the user's data to the database
		friends.push(userData);

		// Return a JSON with the user's bestMatch.
		res.json(bestMatch);

	});

}