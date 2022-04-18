//// Initalize js file
console.log('Hello');


//// fetch weather information
async function fetchWeather(region){
    let url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-281D376F-126F-4682-B710-E57FE26A8431&locationName=${region}`;

}
////


//// update information while user press any other region
function changeReigon() {
    let region = document.querySelector("#region-list").value;

    let weatherData = {
        regionWeather: null,
        GoB: null
    };

    // weatherData.regionWeather = fetchWeather(region);
    // weatherData.GoB = calculateGoB(weatherInfo);

    // render(weatherData);
}
////
