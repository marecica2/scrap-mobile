window.onerror = function(message, url, lineNumber) {  
  alert(JSON.stringify(JSON.stringify(message)));
  alert(JSON.stringify(lineNumber));
  alert(JSON.stringify(url));
  return true;
};  

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.onBackKeyDown, false);
        document.addEventListener("menubutton", this.onMenuKeyDown, false);
    },
    
    onMenuKeyDown: function() {
        $.mobile.navigate("#page4");      
    },

    onBackKeyDown: function() {
        if(confirm("Ukonciť aplikáciu?")){
            navigator.app.exitApp();       
        }
    },
    
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        console.log("device is ready");
        console.log("calling scrap init");
        scrap.init();
        console.log("scrap init successfull");
        

    },
    
    
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
    }
};
