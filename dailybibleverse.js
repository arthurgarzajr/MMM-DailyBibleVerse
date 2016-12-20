//dailybibleverse.js

Module.register("dailybibleverse",{
	// Default module config.
	result: [],
	defaults: {
		text: "Hello Bible!"
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		this.sendSocketNotification('START', 'Hello World');
	},
	
	// Override dom generator.
	getDom: function() {
		var verse = "";
		var reference = "";

		if(this.verseOfTheDay != null && this.reference != null){
			verse = this.verseOfTheDay;
			reference = this.reference;
		}

		var wrapper = document.createElement("div");

		wrapper.innerHTML = verse + " " + reference;
		return wrapper;
    	},

	getScripts: function() {
	    return [
	        this.file('jquery-3.1.1.min.js'), // this file will be loaded straight from the module folder.
	    ]
	},

	socketNotificationReceived: function(notification, payload) {
		if(notification == "BIBLE_GATEWAY_RESULT"){
			var json = payload;
			Log.log(payload);
			//Log.log(json.votd.text);
			//Log.log(json.votd.reference);

			this.verseOfTheDay = json.votd.text;
			this.reference = json.votd.reference;
				
			//Log.log(this.verseOfTheDay);
			this.updateDom();
		}
	}
});