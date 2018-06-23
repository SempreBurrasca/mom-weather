//variabili
let lat
let long
let latN
let longN
let myMainMeteo
let myTemp
let myIcon
let myWeather
let mylocation
let myCity
let myDate
let finalUrl 
let err     = document.getElementById("err")
let apiUrl  = 'https://api.openweathermap.org/data/2.5/weather?'
let apiKey  = '&units=metric&APPID=677c9d9c7032ace46504bb9aedd66848'
let avraiCaldo 
let avraiFreddo
let temperatura
let clima
let vento
let consigli
let myDesc
if (typeof(Storage) !== "undefined") {
    if(localStorage.caldo=='Più di 20°'){
        avraiCaldo = 20
    } else if (localStorage.caldo=='Più di 25°') {
        avraiCaldo = 25        
    } else if(localStorage.caldo=='Più di 30°'){
        avraiCaldo = 30
    } else{
        avraiCaldo = 30
    }
    if(localStorage.freddo=='Meno di 20°'){
        avraiFreddo = 20
    } else if (localStorage.freddo=='Meno di 15°') {
        avraiFreddo = 15        
    } else if (localStorage.freddo=='Meno di 15°'){
        avraiFreddo = 10
    } else{
        avraiFreddo = 10
    } 
} else {
    // Sorry! No Web Storage support..
}
//trigger menu
let myTrigger = () =>{
    let swipe = document.getElementById('my-trigger')
    let menu = document.getElementById('my-menu')
    swipe.classList.toggle('close')
    menu.classList.toggle('hidden')
}
//salvo le preferenze dell'utente
let preferenze = () =>{
    let wizard = document.getElementById('preferenze')
    wizard.classList.toggle('hidden')
    localStorage.setItem("prova", "Funziona")

}
let savePref = () =>{
    let resistenzaCaldo= document.getElementById("yourCaldo")
    let resistenzaFreddo= document.getElementById("yourFreddo")
    localStorage.setItem("caldo", resistenzaCaldo.value)
    localStorage.setItem("freddo", resistenzaFreddo.value)
}
let myTrigger2 = () =>{
    let wizard = document.getElementById('preferenze')
    wizard.classList.toggle('hidden')
}

//registro la posizione dell'utente
let getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition);
    } else {
        err.innerHTML = "Geolocation is not supported by this browser."
    }
}
let savePosition = (position) => {
    latN  = position.coords.latitude  
    longN = position.coords.longitude
    lat  = latN.toString()
    long = longN.toString()
    mylocation = 'lat='+lat+'&lon='+long
    finalUrl     = apiUrl + mylocation + apiKey
    codeLatLng(latN, longN)

}
//scrivo la città e il quartiere dell'utente
let geocoder = new google.maps.Geocoder();
let codeLatLng = (latN, longN) => {
    var latlng = new google.maps.LatLng(latN, longN);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        $('#my-place').empty()
        $('#my-place').append(
            '<h4>'+ results[1].address_components[1].short_name + '</h4>'
        )
        myCity = results[1].address_components[2].long_name
        console.log(results[1])
      } else {
          $('#my-place').append(
            '<h4>Ops! Abbiamo sbagliato qualcosa</h4>'
          )
          console.log("Geocoder : " + status)
        }
    })
}
//prendo i dati del meteo
let callback      = (item)     => {
    myMainMeteo = item.main
    myTemp      = myMainMeteo.temp
    coeffCaldo  = myTemp-avraiCaldo
    coeffFreddo = myTemp-avraiFreddo
    coeffTemp   = coeffCaldo+coeffFreddo
    myHumid     = myMainMeteo.humidity
    myWind      = item.wind.speed*3.6
    myWeather   = item.weather[0]
    myIcon      = myWeather.icon
    myDesc      

    if(myWeather.main=='Clouds'){
        myDesc = "Un po' nuvoloso"
    }else if(myWeather.main=='Rain'){
        myDesc = 'Portati un ombrello che ti bagni.'
    }else{myDesc=' '}
    

    if(35<=myHumid<65){
        clima='il tempo non appiccica '
    }else if (10<=myHumid<35) {
        clima='bevi tanto che secca '
    }else if(myHumid<10) {
        clima='sei nel deserto?! Senti come è secco '  
    }else if(myHumid>=65){
        clima='certo che appiccica '
    } else{}

    if(coeffTemp>20){
        temperatura=' Oggi tanto deodorante che suderai, '
    }else if (coeffTemp<-20) {
        temperatura=' Copriti che avrai freddo e poi ti ammali, '
    }else if(-20<coeffTemp<-5) {
        temperatura=' Mettiti una giacchetta, '
    }else if(5>coeffTemp<20){
        temperatura=' A maniche corte stai bene dai, '
    }

    if(5<=myWind<15){
        vento='. Che piacevole brezza. '
    }else if(15<=myWind<30){
        vento='. Senti che giannetta. '
    }else if(30<=myWind<50){
        vento='. Copriti la gola che ti ammali.  '
    }else if(myWind>=50){
        vento='. Sempre Burrasca '
    }else{
        vento='. Neanche un sussurro di vento.  '
    }
    $('#my-date').empty()
    $('#my-date').append(
        '<h4>'+today+'</h4>'
    )
    $('#my-temp').empty()
    $('#my-temp').append(
        '<h4>'+ myTemp + '°C</h4>'
    )
    $('#my-icon').empty()
    $('#my-icon').append(
        '<img src="http://openweathermap.org/img/w/'+ myIcon + '.png" >'
    )
    /*scrivo i consigli*/
    $('#my-forecast').empty()
    $('#my-forecast').append(
        '<p>'+temperatura+clima+vento+myDesc+'</p>'
    )
    console.log(item)
    console.log(myWind)

}
/*richiedo il json all'api di openmeteo*/
let  cheTempoFa   = ()     => {
    getLocation()
/*faccio la chiamata Api, inserendo l'url e la callback da effettuare con i dati arrivati*/
    $.getJSON(finalUrl, callback)
}
//scrivo i consigli meteo





    
//prendo bg in base alla posizione
let setBg = (item) =>{
    let panoId = item.pano_id
    
}
let apiBg = () =>{
    let apiUrlMaps= 'https://maps.googleapis.com/maps/api/streetview?source=outdoor&radius=5000&size=600x300&location='
    let secondPartMaps='&heading=-45&pitch=42&fov=110&key=AIzaSyAn0k9LwnfimChEjWn81qd4if-5hxRsz3s'
    let finalUrlMaps     = apiUrlMaps + myCity + secondPartMaps
    console.log(finalUrlMaps)
    $.getJSON(finalUrlMaps, setBg)
}
//Che giorno è
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; //January is 0!
let yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;
    //place search
//    function prova(){
//        document.getElementById("my-results").innerHTML = finalUrl
//    }

    /*funzione per chiamare l'api*/
//    let  chiama      = ()     => {
//            console.log(aK)
//            console.log(mylocation)
        /*costruisco la url*/
            //let proxyURL     = //'https://cors-proxy.htmldriven.com/?url='
//            
//            let secondPart   = '&fov=90&heading=235&pitch=10&key='+aK
//            let andString    = '&'
//            let finalUrl     = apiUrl + mylocation + secondPart
//            console.log(finalUrl)
        /*faccio la chiamata Api, inserendo l'url e la callback da effettuare con i dati arrivati*/
//            $.getJSON(finalUrl, prova)
//    }
