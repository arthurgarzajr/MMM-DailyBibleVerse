//dailybibleverse.js

Module.register("MMM-DailyBibleVerse",{
	// Default module config.
	result: [],
	defaults: {
		// Default Bible version is ESV. 
		// Change it to a version that BibleGateway.com supports.
		// https://www.biblegateway.com/usage/linking/versionslist/
		version: 'ESV'
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;

		var configuredVersion = this.config.version;

		//Do this once first
		self.sendSocketNotification('START', configuredVersion);
		
		//Then every hour
		setInterval(function() {
		        self.sendSocketNotification('START', configuredVersion);
    		}, 3600000); //perform every hour (3600000 milliseconds)
	},
	
	// Override dom generator.
	getDom: function() {
		Log.log("Updating MMM-DailyBibleVerse DOM.");
		
		var verse = "";
		var reference = "";

		if(this.verseOfTheDay != null && this.reference != null){
			verse = this.verseOfTheDay;
			reference = " - " + this.reference;
		}

		var wrapper = document.createElement("div");
		wrapper.className = "bright";
		wrapper.innerHTML = verse + reference;
		return wrapper;
    	},

	getScripts: function() {
	    return [
	        this.file('jquery-3.1.1.min.js'), // this file will be loaded straight from the module folder.
	    ]
	},

	socketNotificationReceived: function(notification, payload) {
		Log.log("socket received from Node Helper");
		if(notification == "BIBLE_GATEWAY_RESULT"){
			var json = payload;
			Log.log(payload);
			this.verseOfTheDay = json.votd.text;
			this.reference = json.votd.reference;

			this.updateDom();
		}
	}
});
