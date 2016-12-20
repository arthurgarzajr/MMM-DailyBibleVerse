/* Magic Mirror
 * Node Helper: DailyBibleVerse
 *
 * By Arthur Garza
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
		this.mySpecialProperty = "So much wow!";
		console.log("Started node_helper.js for DailyBibleVerse.");
	},

	socketNotificationReceived: function(notification, payload) {
		console.log(this.name + " node helper received a socket notification: " + notification + " - Payload: " + payload);
		this.bibleGatewayRequest();
	},

	bibleGatewayRequest: function() {
		var self = this;
		var bibleGatewayURL = "https://www.biblegateway.com/votd/get/?format=json"

		request({ url: bibleGatewayURL, method: 'GET' }, function(error, response, body) {			
			if(!error && response.statusCode == 200){
				console.log(body);
				var result = JSON.parse(body);
				self.sendSocketNotification('BIBLE_GATEWAY_RESULT', result);
			}
		});	
	}
});
