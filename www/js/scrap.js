var MyLocalStorage = {};

MyLocalStorage.getItem = function(key) {
    if(localStorage.getItem(key) != null)
        return JSON.parse(localStorage.getItem(key));
    return null;
};

MyLocalStorage.setItem = function(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
};

MyLocalStorage.removeItem = function(key) {
    localStorage.removeItem(key);
};


var scrap = {
    parseJson : function(json){
        if(json != null || json != undefined){
            var obj = JSON.parse(json);  
            return obj;
        }
        return null;
    },    
        
    refresh: 20000,
    host: "http://192.168.1.100:11002",
    
    // container for current ad images
    images : [],
    
    renderMessages : function(){
        var lg = MyLocalStorage.getItem("lang");
        if(lg == null || lg == undefined)
            lg = lang;
        
        // translate all texts
        var elms = $(".i18n");
        for(var i = 0; i < elms.length; i++){
            var elm = $(elms[i]);
            if(messages[lg] != undefined){
                elm.html(messages[lg][elm.attr("data-i18n")]);
            }
        }        
    },
    
    t : function(key){
        var lg = MyLocalStorage.getItem("lang");
        if(lg == null || lg == undefined)
            lg = lang;
        if(messages[lg] != undefined){
            return  messages[lg][key];
        }
        return "null";
    },
    
    init: function(){
        
        $( "#popupSettings" ).enhanceWithin().popup();
        
        // notifications pooler
        scrap.refresh = MyLocalStorage.getItem("refresh");
        if(scrap.refresh == null || scrap.refresh == undefined){
            scrap.refresh = 20000;
            MyLocalStorage.setItem("refresh", scrap.refresh);
        }
        
        // init refresh setting
        $('input:radio[name="refresh"]').filter('[value="'+scrap.refresh+'"]').attr('checked', true);
        
        // init lang setting
        scrap.lang = MyLocalStorage.getItem("lang");
        if(scrap.lang == null || scrap.lang == undefined){
            scrap.lang = lang;
            MyLocalStorage.setItem("lang", scrap.lang);
        }
        $('input:radio[name="lang"]').filter('[value="'+scrap.lang+'"]').attr('checked', true);
        
        // init host setting
        scrap.host = MyLocalStorage.getItem("host");
        if(scrap.host == null || scrap.host == undefined){
            scrap.host = "http://192.168.1.100:11002";
            MyLocalStorage.setItem("host", scrap.host);
        }
        scrap.host = "http://192.168.1.100:11002";
        
        
        $('input:radio[name="baseUrl"]').filter('[value="'+scrap.host+'"]').attr('checked', true);
        
        
        // notifications pooler
        scrap.interval = setInterval(function(){
            scrap.updateNotifications();
        }, scrap.refresh);
        
        // register i18n function
        Handlebars.registerHelper('i18n',
            function(str){
              return (t != undefined ? t(str) : str);
        });
        
        Handlebars.registerHelper('lang',
            function(str){
                return scrap.t(str);
        });
        
        
        // check logged user
        if(MyLocalStorage.getItem("password") == null || MyLocalStorage.getItem("login") == null || MyLocalStorage.getItem("login") == undefined){
            $.mobile.navigate( "#login", { transition: "slide" });
        } else {
            $.mobile.navigate("#page1");
            scrap.user = MyLocalStorage.getItem("login");
            scrap.password = MyLocalStorage.getItem("password");
            scrap.listAds();
            scrap.listNotifications();
        }
        
        // button handlers 
        $(".btn-logout").click(function(){
            scrap.logout();
            MyLocalStorage.removeItem("ads");
            MyLocalStorage.removeItem("notifications");
        });
        
        $("#loginButton").click(function(){
            scrap.login();
        });        

        $("#newAdSubmit").click(function(){
            scrap.newAd();
        });        
        
        $("#newAdSubmitSend").click(function(){
            scrap.postAdSend();
        });        
        
        $("#photo-button").click(function(){
            scrap.takePhoto();
        }); 
        
        $("#settingsClear").click(function(){
            MyLocalStorage.removeItem("notifications");
            scrap.listNotifications();
        });    

        $(".lang").change(function(){
            console.log("xx");
        });    

        $("#settingsSave").click(function(){
            scrap.lang = $('input[name=lang]:checked').val();
            MyLocalStorage.setItem("lang", scrap.lang);
            scrap.renderMessages();
            
            scrap.refresh = $('input[name=refresh]:checked').val();
            MyLocalStorage.setItem("refresh", scrap.refresh);
            scrap.host = $('input[name=baseUrl]:checked').val();
            MyLocalStorage.setItem("host", scrap.host);
            
            // notifications pooler
            clearInterval(scrap.interval);
            scrap.interval = setInterval(function(){
                scrap.updateNotifications();
            }, scrap.refresh);
            
            $.mobile.navigate("#page1");
        });  
        
        $("body").on("click", ".new-ad-send", scrap.postAdFromStore);    
        $("body").on("click", ".new-ad-delete", scrap.deleteAd);    
        $("body").on("click", ".notification-delete", scrap.deleteNotification);    
        
        // add regex functionality to selectors
        jQuery.expr[':'].regex = function(elem, index, match) {
            var matchParams = match[3].split(','),
                validLabels = /^(data|css):/,
                attr = {
                    method: matchParams[0].match(validLabels) ? 
                                matchParams[0].split(':')[0] : 'attr',
                    property: matchParams.shift().replace(validLabels,'')
                },
                regexFlags = 'ig',
                regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
            return regex.test(jQuery(elem)[attr.method](attr.property));
        }
        
        // init form
        scrap.form();
        scrap.selectbox();
        
        scrap.renderMessages();
    },
    
    updateNotifications: function(){
        if(!scrap.checkConnection()){
            console.log("Internet is disconnected");
            return;
        }
        var login = scrap.login;
        var password = scrap.password;
        if(login == null || login == undefined){
            return;
        }
        
        console.log("notification " + scrap.host);
        $.ajax({
            type: "GET",
            url: scrap.host+"/mobile-notifications?login="+scrap.user,
            success: function(data){
                console.log("success notification " + scrap.host);
                if(data != null && data.length > 0){
                    
                    // initiate notifications list
                    var nlist = MyLocalStorage.getItem("notifications");
                    if(nlist == null || nlist == undefined)
                        nlist = [];


                    // add items to nlist
                    for(var i = 0; i < data.length; i++){
                        data[data.length - 1].first = true;
                        data[i].isAuction = data[i].isAuction;
                        data[i].typeLabel = t("ad.type."+data[i].type);
                        data[i].categoryLabel = t("ad.category."+data[i].category);
                        data[i].subCategoryLabel = t("ad.subcategory."+data[i].subCategory);
                        nlist.push(data[i]);
                    }
                    
                    // delete n oldest items from begin of array
                    if(nlist.length >= 50){
                        for(var i = 0; i < data.length; i++){
                            nlist.shift();
                        }
                    }
                    
                    // push notification and redraw notification list
                    MyLocalStorage.setItem("notifications", nlist);
                    scrap.listNotifications();
                    
                    if(data.length >= 5)
                        window.plugin.notification.local.add({ message: "Máte "+ data.length + " nových upozornení."}); 
                    else if(data.length == 1)
                        window.plugin.notification.local.add({ message: "Máte "+ data.length + " nové upozornenie."}); 
                    else if(data.length > 1 && data.length < 5)
                        window.plugin.notification.local.add({ message: "Máte "+ data.length + " nové upozornenia."}); 
                }
            },
            contentType: "application/json"
        });     
    },
    
    
    cleanForm: function(){
        $("#imageContainer").html("");
        scrap.images = [];
        $("#price").val("");
        $("#amount").val("");
    },
    
    
    getAdFromStorage: function(id){
        var ads = MyLocalStorage.getItem("newAds");
        var ad = null;
        for(var i = 0; i < ads.length; i++){
            if(ads[i].uuid == id){
                ad = ads[i];
            }
        }     
        return ad;
    },
    
    postAdSend: function(){
        var ad = {};
        ad.images = scrap.images;
        ad.buySell = $('input[name=buySell]:checked').val();
        ad.priceType = $('input[name=priceType]:checked').val();
        ad.type = $("#type").val();
        ad.category = $("#category").val();
        ad.subCategory = $("#subCategory").val();
        ad.price = $("#price").val();
        ad.amount = $("#amount").val();
        ad.uuid  = scrap.guid();
        ad.login = MyLocalStorage.getItem("login");
        ad.password = MyLocalStorage.getItem("password");
        ad.description = $("#description").val();
        scrap.postAd(ad);
    },
    
    // xxx
    // http post to /mobile-newAd
    postAd: function(ad){
        if(scrap.checkConnection()){
            scrap.postAdAjax(ad, null, function(){
                console.log("xxx ");
                if(ad.images != undefined && ad.images != null && ad.images.length > 0){
                   
                    for(var i = 0; i < ad.images.length; i++){
                        console.log("image to send: " + ad.images[i]);
                        var options = new FileUploadOptions();
                        options.fileKey = "file";
                        options.fileName = "test.jpg";
                        options.mimeType = "image/jpeg";
                        options.httpMethod = "POST";
                        options.chunkedMode = false;
                        options.params = {};
                        options.params.login = MyLocalStorage.getItem("login");
                        options.params.password = MyLocalStorage.getItem("password");
                        options.params.id = ad.uuid;
                        console.log(options);

                        // send images
                        var ft = new FileTransfer();
                        ft.upload(ad.images[i], encodeURI(scrap.host + "/mobile-upload"), function(){
                            scrap.deleteNewAd(ad.uuid);
                            scrap.cleanForm();
                            console.log(messages[lang]["alert.ad.send"]);
                        }, function(data){
                            console.log(data)
                        }, options);
                    }
                    
                } else {
                    scrap.deleteNewAd(ad.uuid);
                    scrap.cleanForm();
                    console.log(messages[lang]["alert.ad.send"]);
                }
            }, function(){
                console.log("Error");
            });    
        } else {
            console.log(messages[lang]["alert.connection"]);
        }
    },
    
    postAdFromStore: function(){
        var id = $(this).attr("data-id");
        var ad = scrap.getAdFromStorage(id);
        scrap.postAd(ad);
    },

    deleteAd: function(){
        var ads = MyLocalStorage.getItem("newAds");
        var ad = $(this).attr("data-id");
        var index = -1;
        
        // find index
        for(var i = 0; i < ads.length; i++){
            if(ads[i].uuid == ad){
                index = i;
                break;
            }
        }          
        
        if(index > -1){
            ads.splice(index, 1);
            MyLocalStorage.setItem("newAds", ads);
            scrap.listAds();
        }
        $( ".popups" ).popup("close");
    },
    
    deleteNotification: function(){
        var notifications = MyLocalStorage.getItem("notifications");
        var notif = $(this).attr("data-id");
        
        // find index
        for(var i = 0; i < notifications.length; i++){
            if(notifications[i].uuid == notif){
                if(i > -1){
                    notifications.splice(i, 1);
                    MyLocalStorage.setItem("notifications", notifications);
                    scrap.listNotifications();
                }
                break;
            }
        }          
        $( ".popups" ).popup("close");
    },
    
    
    deleteNewAd: function(ad){
        var ads = MyLocalStorage.getItem("newAds");
        for(var i = 0; i < ads.length; i++){
            if(ads[i].uuid == ad){
                ads.splice(i, 1);
                MyLocalStorage.setItem("newAds", ads);
                scrap.listAds();
            }
            $( ".popups" ).popup("close");
        }          
    },
    
    
    selectbox: function(){
        $('option:regex(value,00[0-9][0-9][0-9][0-9])').hide();
        
        // by default show first category 
        if($("#type").val() == "001")
            $("#001").show();
        
        $("#type").change(function(){
            var selected = $(this).find(":selected").val();
            if(selected == "001"){
                $(".001").show();
            } else {
                $(".001").hide();
            }
        });             
        
        var generateOptions = function(){
            var selected = $(this).find(":selected").val();
            var elms = $('option:regex(value,'+selected+'[0-9][0-9][0-9])');
            $('#subCategory').html("<option value=''></option>");
            $.each(elms, function() {
                $('#subCategory').append($("<option/>", {
                    value: $(this).attr("value"),
                    text: $(this).text()
                }));
            });
            $("#subCategory").prop('selectedIndex',0);          
        }
        $("#category").change(generateOptions);
        $("#category").change();
    },    
    
    newAd: function(){
        var ad = {};
        ad.images = scrap.images;
        ad.buySell = $('input[name=buySell]:checked').val();
        ad.priceType = $('input[name=priceType]:checked').val();
        ad.type = $("#type").val();
        m = new Date();
        ad.created =  (m.getUTCDate()+1) +"."+ m.getUTCMonth()+"." +m.getUTCFullYear() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
        ad.category = $("#category").val();
        ad.subCategory = $("#subCategory").val();
        ad.price = $("#price").val();
        ad.amount = $("#amount").val();
        ad.uuid  = scrap.guid();
        ad.login = MyLocalStorage.getItem("login");
        ad.password = MyLocalStorage.getItem("password");
        ad.description = $("#description").val();
        
        // clean images
        $("#imageContainer").html();
        scrap.images = [];
        var newAds = MyLocalStorage.getItem("newAds");
        if(newAds == null || newAds == undefined)
            newAds = [];
        
        newAds.push(ad);
        MyLocalStorage.setItem("newAds", newAds);
        
        // refresh ads
        scrap.listAds();
        $.mobile.navigate("#page2");
    },

    listAds: function() {
        var items = MyLocalStorage.getItem("newAds");
        for(var i in items){
            var item = items[i];
            item.typeLabel = t("ad.type."+item.type);
            item.categoryLabel = t("ad.category."+item.category);
            item.subCategoryLabel = t("ad.subcategory."+item.subCategory);
        }

        var source = $("#ads-template").html();
        var template = Handlebars.compile(source);
        var html = template({"items": items, "host" : scrap.host});
        $("#ads-container").html(html).trigger("create");
    },

    listNotifications: function() {
        var items = MyLocalStorage.getItem("notifications");
        if(items != null && items != undefined)
            items.reverse();
        var source = $("#notifications-template").html();
        var template = Handlebars.compile(source);
        
        var header = "";
        header=window.btoa(MyLocalStorage.getItem("login") + ":" + MyLocalStorage.getItem("password"));
        var html = template({"items": items, "host" : scrap.host, "authorization" : header});        
        $("#notifications-container").html(html).trigger("create");
    },

    takePhoto: function() {
        var options = { quality : 95, 
                destinationType: Camera.DestinationType.FILE_URI, 
                correctOrientation : true,
                encodingType: Camera.EncodingType.JPEG,
                saveToPhotoAlbum: true
        };
        navigator.camera.getPicture(scrap.photoSuccess, scrap.photoFail, options);
    },

    photoSuccess: function(imageURI) {
        var images = $("#imageContainer");
        images.append("<img src='"+imageURI+"' style='height: 100px;'>")
        scrap.images.push(imageURI);
    },

    photoFail: function(message) {
        console.log(message);
    },
    
    logout: function() {
        MyLocalStorage.removeItem("password");
        MyLocalStorage.removeItem("login");
        $.mobile.navigate("#login", { transition: "slide" });
    },

    login: function() {
        MyLocalStorage.setItem("password", $("#password").val());
        MyLocalStorage.setItem("login", $("#loginValue").val());
        scrap.user = MyLocalStorage.getItem("login");
        scrap.password = MyLocalStorage.getItem("password");
        $("#loginValue").val(null);
        $("#password").val(null);
        scrap.listAds();
        scrap.listNotifications();

        $.mobile.navigate("#page1", { transition: "slide" });
    },
    
    footer: function() {
        //var html = nunjucks.render('footer.html');
        var source = $("#footer-template").html();
        var template = Handlebars.compile(source);
        var html = template();           
        $(".footer-container").html(html).trigger("create");
    },
    
    form: function() {
        var source = $("#ad-form-template").html();
        var template = Handlebars.compile(source);
        var html = template();           
        $(".ad-form-template").html(html).trigger("create");
    },

    header: function(param) {
        $(".header-container").each(function(){
            var param = $(this).attr("data-title");
            var html = nunjucks.render('header.html', {title: param});
            $(this).html(html).trigger("create");            
        });
    },
    
    checkConnection: function() {
        var networkState = navigator.connection.type;
        if(Connection.NONE == networkState)
            return false;
        return true;
    },
    
    authorizationHeader: function() {
        return "Authorization="+btoa(scrap.user+":"+scrap.password);
    },
    
    getAds : function(params, success, error){
        console.log("%% GET " + scrap.host+"/ads?"+params);
        $.ajax({
            type: "GET",
            url: scrap.host+"/ads?"+params,
            success: success,
            error: function(err){
                console.log(err);
            },
            contentType: "application/json"
        });
    },

    postAdAjax : function(data, params, success, error){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: scrap.host+"/mobile-newAd",
            data: JSON.stringify(data),
            success: success,
            error: function(err){
                console.log(err);
            }
        });
    },
    
    isMobile : function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return check; 
    },    
    
    guid: function() {
        function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "" + p.substr(0,4) + "" + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }
};






