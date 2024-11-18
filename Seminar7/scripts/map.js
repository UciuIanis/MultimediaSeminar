window.onload = function() {
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
    function onGeolocationSuccess(location){
        let lat = location.coords.latitude;
        let long = location.coords.longitude;

        var map = L.map('map').setView([lat, long], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        let marker = L.marker([lat, long]).addTo(map);
        current = [lat, long];
        let polyline = L.polyline([[lat, long], current]).addTo(map);
        setInterval(() => {
            marker.remove();
            polyline.remove();
            long+=0.01;
            marker=L.marker([lat, long]).addTo(map);
            polyline = L.polyline([[lat, long],current]).addTo(map);
            map.fitBounds(polyline.getBounds());
        }, 500);
        setTimeout(() => {
            marker.remove();
        }, 1000);

        L.circle([lat, long], {
            radius: location.coords.accuracy
        }).addTo(map);

    }
    function onGeolocationError(error){
        console.log(error);
    }
}