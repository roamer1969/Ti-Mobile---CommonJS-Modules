     //app.js to bootstrap modules (UI window and database)
      var AppWin = require('ui/win');

   // if the app is loading for the first time, seed local sqllite with data from a remote server
     if (!Ti.App.Properties.hasProperty('DBseeded'))
      {
       require('modules/db_module').seedDB(_uid);
       // listen to DB updated event and open window
        Ti.App.addEventListener('DBupdated', function openWin(){
          var CurrentWin = new AppWin.EventListWin();
          CurrentWin.open();
        });
     }
     else
     {
 	    var CurrentWin = new AppWin.EventListWin();
        CurrentWin.open();
     }	

