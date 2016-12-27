/* Magic Mirror
 * Node Helper: MMM-DailyBibleVerse
 *
 * By Arthur Garza
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
		console.log("Started node_helper.js for MMM-DailyBibleVerse.");
	},

	socketNotificationReceived: function(notification, payload) {
		console.log(this.name + " node helper received a socket notification: " + notification + " - Payload: " + payload);
		this.bibleGatewayRequest(payload);
	},

	bibleGatewayRequest: function(version) {
		var self = this;
		var bibleGatewayURL = "https://www.biblegateway.com/votd/get/?format=json&version=" + version

		request({ url: bibleGatewayURL, method: 'GET' }, function(error, response, body) {			
			if(!error && response.statusCode == 200){
				console.log(body);
				var result = JSON.parse(body);
				self.sendSocketNotification('BIBLE_GATEWAY_RESULT', result);
			}
		});	
	}
});
