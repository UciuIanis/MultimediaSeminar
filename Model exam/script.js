window.onload = function() {
    var button = document.getElementById("locate")
    var latitude = document.getElementById("latitude")
    var longitude = document.getElementById("longitude")
    button.addEventListener("click", function() {
        navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
        function onGeolocationSuccess(location){
            let lat = location.coords.latitude
            let long = location.coords.longitude

            let setLat = parseFloat(latitude.value)
            let setLong = parseFloat(longitude.value)
            console.log(lat, long, setLat, setLong);
            var dist = calculateDistance(lat, long, setLat, setLong);
            console.log(dist);
            var map = L.map('map').setView([lat, long], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            let marker = L.marker([lat, long]).addTo(map);
            setTimeout(()=>{
                let marker2 = L.marker([setLat, setLong]).addTo(map);
                setTimeout(()=>{
                    let polyline = L.polyline([[lat, long], [setLat, setLong]]).addTo(map);
                }, dist)
            }, dist)
        }
        function onGeolocationError(error){
            console.log(error);
        }
    })

    calculateDistance = function(lat, long, setLat, setLong){
        let R = 6371e3; // metres
        let φ1 = lat * Math.PI/180; // φ, λ in radians
        let φ2 = setLat * Math.PI/180;
        let Δφ = (setLat-lat) * Math.PI/180;
        let Δλ = (setLong-long) * Math.PI/180;

        let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        let d = R * c; // in metres
        return d;
    }
}