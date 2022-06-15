const response = await fetch('https://api.wmata.com/Bus.svc/json/jRouteDetails?RouteID=70', {
    headers: {
        'api_key': '3e10c125795e4bc894e0292db731335c'
    },
})

const route70 = await response.json()


const button = document.getElementById('button')
const stopname = document.getElementById('stopname')
const stopnumber = document.getElementById('stopnumber')


const route = '70'
const stops = route70["Direction1"]["Stops"]
    .filter(item => {
        return item['Routes'].includes(route)
    })
const busStops = stops.map(item => {
    const { Lat, Lon } = item
    return [Lon, Lat]
})

mapboxgl.accessToken = 'pk.eyJ1Ijoibmlrb3NuaWtvbG92IiwiYSI6ImNsNGRyanhwNDBiOXYzanBhMTlsMnM4eWIifQ.-RxoyiBqmGTjkVqv4VAsQg';

stopname.textContent = stops[0]["Name"]
stopnumber.textContent = '1'


let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: busStops[parseInt(busStops.length / 2)],
    zoom: 11,
});
var marker = new mapboxgl.Marker()
    .setLngLat(busStops[0])
    .addTo(map)

let counter = 0;
const move = () => {
    setTimeout(() => {
        if (counter >= busStops.length) return;
        stopname.textContent = stops[counter]['Name']
        stopnumber.textContent = `${counter + 1}`
        marker.setLngLat(busStops[counter])
        counter++;
        move()
    }, 1500)
}


button.onclick = move
if (typeof module !== 'undefined') {
    module.exports = { move };
}