var MyLocalStorage = {};

MyLocalStorage.getItem = function(key) {
    return JSON.parse(localStorage.getItem(key));
};

MyLocalStorage.setItem = function(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
};

MyLocalStorage.removeItem = function(key) {
    localStorage.removeItem(key);
};

var scrap = {
    init: function(){
        if(MyLocalStorage.getItem("password") == null && MyLocalStorage.getItem("login") == null){
            $("#loginForm").show();
            $("#myContent").hide();
        } else {
            $("#loginForm").hide();
            $("#myContent").show();
            scrap.listAds();
        }
        
        $("#logoutButton").click(function(){
            scrap.logout();
        });
        
        $("#loginButton").click(function(){
            scrap.login();
        });        
    },
    
    listAds: function() {
        scrap.getAds("", function(data){
            console.log(data);
            var html = "<ul>";
            for(var i = 0; i < data.length; i++){
                html += "<li>"+data[i].created+"</li>"
            }
            html += "</ul>";
            $("#ads").html(html);
        });
    },

    logout: function() {
        MyLocalStorage.removeItem("password");
        MyLocalStorage.removeItem("login");
        $("#loginForm").show();
        $("#myContent").hide();
    },

        
    login: function() {
        MyLocalStorage.setItem("password", $("#password").val());
        MyLocalStorage.setItem("login", $("#login").val());
        $("#login").val(null);
        $("#password").val(null);

        $("#loginForm").hide();
        $("#myContent").show();
        scrap.listAds();
    },
    
    getAds : function(params, success, error){
        $.ajax({
            type: "GET",
            url: "https://localhost:10001/ads?"+params,
            success: success,
            error: error,
            contentType: "application/json"
        });
    }

};


