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
//trigger menu
let myTrigger = () =>{
    let swipe = document.getElementById('my-trigger')
    let menu = document.getElementById('my-menu')
    swipe.classList.toggle('close');
    menu.classList.toggle('hidden')
}
//salvo le preferenze dell'utente
let preferenze = () =>{

}

//registro la posizione dell'utente
let getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition);
    } else {
        err.innerHTML = "Geolocation is not supported by this browser.";
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
    myWeather   = item.weather[0]
    myIcon      = myWeather.icon
    
    $('#my-date').append(
        '<h4>'+item.dt+'</h4>'
    )
    $('#my-temp').empty()
    $('#my-temp').append(
        '<h4>'+ myTemp + '°C</h4>'
    )
    $('#my-icon').append(
        '<img src="http://openweathermap.org/img/w/'+ myIcon + '.png" >'
    )
    console.log(item)

}
/*richiedo il json all'api di openmeteo*/
let  cheTempoFa   = ()     => {
    getLocation()
/*faccio la chiamata Api, inserendo l'url e la callback da effettuare con i dati arrivati*/
    $.getJSON(finalUrl, callback)
}





    
//prendo bg in base alla posizione
//let aK = 'AIzaSyAn0k9LwnfimChEjWn81qd4if-5hxRsz3s'
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
//            let apiUrl       = '  https://maps.googleapis.com/maps/api/streetview?size=1400x1400&'
//            let secondPart   = '&fov=90&heading=235&pitch=10&key='+aK
//            let andString    = '&'
//            let finalUrl     = apiUrl + mylocation + secondPart
//            console.log(finalUrl)
        /*faccio la chiamata Api, inserendo l'url e la callback da effettuare con i dati arrivati*/
//            $.getJSON(finalUrl, prova)
//    }
