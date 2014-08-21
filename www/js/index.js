//window.onerror = function(message, url, lineNumber) {  
//  alert(JSON.stringify(JSON.stringify(message)));
//  alert(JSON.stringify(lineNumber));
//  alert(JSON.stringify(url));
//  return true;
//};  


var lang = "sk";
var messages = {
    sk : {
        "alert.removed" : "Dáta  boli odstranené",
        "alert.saved" : "Zmeny boli uložené",
        "alert.error" : "Vyskytla sa chyba. ",
        "alert.ad.send" : "Inzerat bol úspešne odoslaný",
        "alert.connection" : "Internet je odpojený",
        "scrap" : "Kovový šrot",
        "mixedScrap" : "Zmiešaný šrot",
        "demolitions" : "Demolácie",
        "secondHand" : "Použité stroje",
        "transit" : "Doprava",
        "jobOffer" : "Ponuka práce",
        "category" : "Kategória",
        "subcategory" : "Podkategória",
        "newAdCat" : "Nový inzerát pre kategóriu",
        "time" : "Čas zverejnenia",
        "choose" : "Vyber možnosť",
        "open" : "Otvor inzerát",
        "delete" : "Zmazať",
        "send" : "Odoslať",
        "ad.category.001":"Hliník",
        "ad.category.002":"Hliník sekundárny",
        "ad.category.003":"Meď",
        "ad.category.004":"Bronz",
        "ad.category.005":"Mosadz",
        "ad.category.006":"Olovo",
        "ad.category.007":"Zinok",
        "ad.category.008":"Cín",
        "ad.category.009":"Legovaný odpad nerez",
        "ad.category.010":"Ostatné kovy",
        "ad.subcategory.001001":"Aluminium primárny",
        "ad.subcategory.001002":"AlMgSi 0,5 profily lesklé,nové",
        "ad.subcategory.001003":"Al plech 99,5 nový",
        "ad.subcategory.001004":"AlMg profily lakované",
        "ad.subcategory.001005":"Al drát 99,5 nový",
        "ad.subcategory.001006":"Al drát 99,5 oxidovaný",
        "ad.subcategory.001007":"Al pasnice",
        "ad.subcategory.001008":"Al kovolisty",
        "ad.subcategory.001009":"AlSi 1 profily",
        "ad.subcategory.001010":"AlMg plechy nové,lesklé",
        "ad.subcategory.001011":"AlMg plechy s fóliou",
        "ad.subcategory.001012":"AlMg výseky nové",
        "ad.subcategory.001013":"AlMg3",
        "ad.subcategory.001014":"AlMn odpad",
        "ad.subcategory.002001":"AlMgSi 0,5 profily s PVC staré",
        "ad.subcategory.002002":"AlMgSi 0,5 profily s PVC nové",
        "ad.subcategory.002003":"Al plechy nové",
        "ad.subcategory.002004":"Al plechy lakované(mix)",
        "ad.subcategory.002005":"Al plechy s 2&#37;Fe",
        "ad.subcategory.002006":"Lamely z Al chladičov",
        "ad.subcategory.002007":"Al Cu chladiče s Fe",
        "ad.subcategory.002008":"Al liaty bez Fe(nový+starý)",
        "ad.subcategory.002009":"Al liaty 2&#37;",
        "ad.subcategory.002010":"Al disky",
        "ad.subcategory.002011":"Al kusový",
        "ad.subcategory.002012":"Al triesky",
        "ad.subcategory.002013":"Al fólie",
        "ad.subcategory.002014":"Al Fe laná",
        "ad.subcategory.002015":"Al káble",
        "ad.subcategory.002016":"Al rafinacia",
        "ad.subcategory.002017":"Al “sendvič” plechy",
        "ad.subcategory.002018":"Al značky",
        "ad.subcategory.002019":"Al žalúzie",
        "ad.subcategory.002020":"Al fľašové uzávery",
        "ad.subcategory.002021":"Al plechovky",
        "ad.subcategory.002022":"Iné",
        "ad.subcategory.003001":"Cu katody",
        "ad.subcategory.003002":"Cu drát nový,lesklý",
        "ad.subcategory.003003":"Cu granulát",
        "ad.subcategory.003004":"Cu pocinovana",
        "ad.subcategory.003005":"Cu drát zelený",
        "ad.subcategory.003006":"Cu pasnice lesklé",
        "ad.subcategory.003007":"Cu pasnice lakované",
        "ad.subcategory.003008":"Cu drát holý",
        "ad.subcategory.003009":"Cu plech,trúbky nové",
        "ad.subcategory.003010":"Cu kusová ťažka",
        "ad.subcategory.003011":"Cu poniklovaná",
        "ad.subcategory.003012":"Cu postriebrená",
        "ad.subcategory.003013":"Cu Raff 95&#37;",
        "ad.subcategory.003014":"Cu “kanál” drát",
        "ad.subcategory.003015":"Cu drát lakovaný",
        "ad.subcategory.003016":"Cu ľahká",
        "ad.subcategory.003017":"Cu cievky",
        "ad.subcategory.003018":"Cu triesky",
        "ad.subcategory.003019":"Cu Wicu-trúbky",
        "ad.subcategory.003020":"Cu trafa",
        "ad.subcategory.003021":"Cu Ms chladiče",
        "ad.subcategory.003022":"Cu káble",
        "ad.subcategory.003023":"Cu káble s PVC",
        "ad.subcategory.003024":"Cu káble k lupaniu",
        "ad.subcategory.003025":"Cu zemné káble",
        "ad.subcategory.003026":"Cu káble mastné",
        "ad.subcategory.003027":"Cu drát s papierom",
        "ad.subcategory.003028":"Elektromotory",
        "ad.subcategory.003029":"Chladničkové motory",
        "ad.subcategory.003030":"Iné",
        "ad.subcategory.004001":"Bronz červený a triesky",
        "ad.subcategory.004002":"Bronz cínový kusový",
        "ad.subcategory.004003":"Bronz cínový valcovaný",
        "ad.subcategory.004004":"Bronz magnetický",
        "ad.subcategory.004005":"Bz Ms triesky",
        "ad.subcategory.004006":"Iné",
        "ad.subcategory.005001":"Ms kohútiková",
        "ad.subcategory.005002":"Ms 63",
        "ad.subcategory.005003":"Ms 58",
        "ad.subcategory.005004":"Ms kondenzačné trúbky",
        "ad.subcategory.005005":"Ms 58 triesky čisté",
        "ad.subcategory.005006":"Ms nábojnice",
        "ad.subcategory.005007":"Ms Kartuschen",
        "ad.subcategory.005008":"Alpaka",
        "ad.subcategory.005009":"Tombak",
        "ad.subcategory.005010":"Ms triesky mix",
        "ad.subcategory.005011":"Ms rafinačka",
        "ad.subcategory.005012":"Iné",
        "ad.subcategory.006001":"Pb odpad starý",
        "ad.subcategory.006002":"Vyvažovacie olovka",
        "ad.subcategory.006003":"Pb mašle",
        "ad.subcategory.006004":"Tlačiarenské olovo",
        "ad.subcategory.006005":"Pb guľky,diabolky,broky",
        "ad.subcategory.006006":"Pb batérie",
        "ad.subcategory.006007":"Iné",
        "ad.subcategory.007001":"Zn odpad nový",
        "ad.subcategory.007002":"Zn odpad starý",
        "ad.subcategory.007003":"Zn zliatina nová,bez Fe",
        "ad.subcategory.007004":"Zn zliatina stará s Fe",
        "ad.subcategory.007005":"Zn vyvážovacie závažia",
        "ad.subcategory.007006":"Iné",
        "ad.subcategory.008001":"Sn čistý",
        "ad.subcategory.008002":"Sn pájka",
        "ad.subcategory.008003":"Sn stery",
        "ad.subcategory.008004":"Iné",
        "ad.subcategory.009001":"Cr odpad",
        "ad.subcategory.009002":"Cr triesky",
        "ad.subcategory.009003":"Cr/Ni 18/8",
        "ad.subcategory.009004":"Cr/Ni 18/8 triesky",
        "ad.subcategory.009005":"Cr/Ni/Mo 18/10/2",
        "ad.subcategory.009006":"Cr/Ni/Mo 18/10/2 triesky",
        "ad.subcategory.009007":"Ni odpad",
        "ad.subcategory.009008":"NCT odpad",
        "ad.subcategory.009009":"Iné",
        "ad.subcategory.010001":"Magnezium",
        "ad.subcategory.010002":"Ti odpad",
        "ad.subcategory.010003":"Ti triesky",
        "ad.subcategory.010004":"Tvrdokov",
        "ad.subcategory.010005":"Niresist",
        "ad.subcategory.010006":"NI Zliatiny",
        "ad.subcategory.010007":"Katalyzátory",
        "ad.subcategory.010008":"Molybdén",
        "ad.subcategory.010009":"Wolfrám",
        "ad.subcategory.010010":"Iné        ",
        "titleLogin" : "STI Mobile - Login",
        "titleEvents" : "STI Mobile - Udalosti",
        "titleSettings" : "STI Mobile - Nastavenia",
        "titleNewAd" : "STI Mobile - Nový inzerát",
        "titleSavedAds" : "STI Mobile - Uložené inzeráty",
        "lang" : "Jazyk",
        "cancel" : "Zrušiť",
        "deleteData" : "Zmazať dáta",
        "save" : "Uložiť",
        "refresh" : "Frekvencia obnovy",
        "settings" : "Nastavenia",
        "logout" : "Odhlásiť sa",
        "send" : "Odoslať",
        "login" : "Login",
        "password" : "Heslo",
        "resetForm" : "Vymazať formulár",
        "saveToServer" : "Odoslať na server",
        "saveLocally" : "Uložiť lokálne",
        "description" : "Popis",
        "type" : "Typ",
        "price" : "Cena",
        "amount" : "Množstvo",
        "ad" : "Inzerát",
        "auction" : "Aukcia",
        "buy" : "Ponuka",
        "sell" : "Dopyt",
        "takePhoto" : "Pridaj fotografiu",
        "events" : "Udalosti",
        "savedAds" : "Uložené inzeráty",
        "newAd" : "Nový inzerát"
    }, 
    cz : {
        "newAd" : "New Ad"
    }, 
    pl : {
        "newAd" : "New Ad"
    }, 
    hu : {
        "newAd" : "New Ad"
    }, 
    de : {
        "newAd" : "New Ad"
    }, 
    en : {
        "newAd" : "New Ad"
    } 
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
        //alert("device ready");
        //app.receivedEvent('deviceready');
        console.log("device is ready");
        console.log("calling scrap init");
        //scrap.init();
        console.log("scrap init successfull");
        
        navigator.globalization.getPreferredLanguage(
                function (language) {
                    if(language.value.contains("sk"))
                        lang = "sk";
                    if(language.value.contains("cz"))
                        lang = "cz";
                    if(language.value.contains("hu"))
                        lang = "hu";
                    if(language.value.contains("pl"))
                        lang = "pl";
                    if(language.value.contains("en"))
                        lang = "en";
                    if(language.value.contains("de"))
                        lang = "de";
                    
                    alert('language: ' + language.value + '\n');
                    var storedLang = MyLocalStorage.getItem("lang");
                    MyLocalStorage.setItem("lang", lang);
                },
                function () {
                    console.log('Error getting language\n');
                }
        );
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
