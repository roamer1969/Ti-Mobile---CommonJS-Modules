/* xhr network call to a remote REST service or any server generic handler 
 * that returns json objects
*/

exports.xhr_get = function(url, param, caller) {
 	var act_indicator = Titanium.UI.createActivityIndicator({
        location: Titanium.UI.ActivityIndicator.DIALOG,
        message: 'please wait...'
    });
 	if (Ti.Network.networkType !== Ti.Network.NETWORK_NONE) {
	     act_indicator.show();
	     
	     var xhr = Ti.Network.createHTTPClient();
          xhr.setTimeout(25000);
          xhr.open('GET', url);
          xhr.setRequestHeader('accept', "application/json");
          
          xhr.onload = function() {
			caller(JSON.parse(this.responseText));
			act_indicator.hide();
			};
		   
		    xhr.onerror = function (e) {
		    act_indicator.hide();
            alert("Network communication error! Please try again.");
            return;
            };
          xhr.send(param);
          
          
      }
    else {
            Ti.UI.createAlertDialog({
                title: 'Network Connection',
                message: 'Your device is not connected to a network. Please connect to a network and try again.',
                buttonNames: ['OK']
            }).show();
        } //end network check 
      
   };
	
 