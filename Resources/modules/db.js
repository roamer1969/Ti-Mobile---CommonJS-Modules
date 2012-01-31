 // generic query list handler
 var event_query_result = function(queryString){
  	  
  	  var _array = [];
  	  
  	  if(Ti.App.Properties.hasProperty('DBseeded'))
  	  {
   	    var db = Ti.Database.open('SQLLITE_DB');
        var rows = db.execute(queryString);
        
          while (rows.isValidRow()) {
            _array.push({  //add these attributes for the benefit of a table view
            	         id: rows.field(0), //custom data attribute to pass to detail page
            	         title: rows.field(1),
            	         startdate: rows.field(2),
            	         hasChild:true,
                         });
              rows.next();
           };
          rows.close();
          db.close();
       }
     	  return _array;
  	};
 
 
 // Seed the local database with remote data obtained from a network call
 exports.seedDB = function(uid){
  		// if the database is not seeded, update it
  		if (!Ti.App.Properties.hasProperty('DBseeded')) {
        
          // create a local SQLlite database with one empty table - EVENTS
          var db = Ti.Database.open('SQLLITE_DB');
          db.execute('CREATE TABLE IF NOT EXISTS events (event_id INTEGER NOT NULL PRIMARY KEY, event_name TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL, desc TEXT NOT NULL, address TEXT NOT NULL, city TEXT NOT NULL, state TEXT NOT NULL, zipcode TEXT NOT NULL)');
       
        // network_module - retrieve json data from a remote REST service )
        var network =  require('modules/network');
        var url = "https://yourURL/rest_web_service";
        var param = [];
       // GET REMOTE DATA & INSERT TO LOCAL EVENTS TABLE
		network.xhr_get(url, param, function(json) {
		  if (json != null){
			 
			 for (var i=0,j=json.EVENTS.length;i<j;i++) {
              db.execute('INSERT INTO events (event_id, event_name, start_date,  end_date, desc, address, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', json.EVENTS[i].EVENT_ID, json.EVENTS[i].EVENT_NAME, json.EVENTS[i].START_DATE, json.EVENTS[i].dayofweek, json.EVENTS[i].END_DATE, json.EVENTS[i].DESC, json.EVENTS[i].ADDRESS, json.EVENTS[i].CITY, json.EVENTS[i].STATE, json.EVENTS[i].ZIPCODE); 
               }
               
              db.close();
              Ti.App.fireEvent('DBupdated');
			 }
		  Ti.App.Properties.setString('DBseeded','wahooooo');
		});
      }
  };
  
exports.eventlist = function(){
      var query = "SELECT event_id, event_name, dayofweek, strftime('%m/%d/%Y', events.start_date) as start_date " +
                    "FROM events WHERE date(events.start_date) >  date('now','-1 days') ORDER BY date(events.start_date)";
     	return event_query_result(query);
     };
     
exports.EventDetailResult = function(eid){
  	var db = Ti.Database.open('SQLLITE_DB');
    var row = db.execute("SELECT desc FROM events WHERE event_id=" + eid);
    return  row;
    row.close();
    db.close();
  };