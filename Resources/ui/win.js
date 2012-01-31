
// detail event window
var EventDetail = function (_eventobj){
 // QUERY DATA BASE FOR EVENT DETAIL	
 var rows = require('modules/db_module').EventDetailResult(_eventobj.id);
 var win = Ti.UI.createWindow({title: _eventobj.title});
	
	if (rows.isValidRow()) {
		 var EventScoop = Titanium.UI.createLabel({
         text: rows.fieldByName('desc'),
        });
     win.add(EventScoop);
	}
 return win;
};

// parent window show event list
exports.EventListWin = function()
  {
  	
	var win = Ti.UI.createWindow({
		title: 'Event List',
		backgroundColor:'#fff'
	});
	var table = Ti.UI.createTableView();
	
	// commonJS require to invoke methods exposed in database module
	var results = require('modules/db_module').eventlist();  
	table.setData(results);
	 win.add(table);
	 
	 table.addEventListener('touchend', function(_e) {
	 	// open detail modal window
		var win2 = EventDetail(_e.rowData); 
        win2.open({modal: true});
      });
  return win;
};

