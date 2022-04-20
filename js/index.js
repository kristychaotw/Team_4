//// Initalize js file
console.log('Hello');
let weatherData;
////


//////////////////////////////////// Model ////////////////////////////////////
//// reorganize data structure
function getFinalData(data, date){
    let accurateDate;
    const final = data.map((item) => {
        const {startTime, endTime, parameter} = item;
        if(date === 'today'){
            accurateDate = startTime.slice(0,10);
        }else{
            accurateDate = endTime.slice(0,10);
        }
        return parameter
    })
    return {'data': final, 'date': accurateDate}
}
////


//// fetch weather information
async function fetchWeather(region){
    let url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-281D376F-126F-4682-B710-E57FE26A8431&locationName=${region}`;

    const response = await fetch(url);
    const rawData = await response.json();

    const records = rawData['records']['location'][0]['weatherElement'];
    console.log(records)
    const Wx = records[0]['time'].slice(0,2);
    const PoP = records[1]['time'].slice(0,2);
    const MinT = records[2]['time'].slice(0,2);
    const CI = records[3]['time'].slice(0,2);
    const MaxT = records[4]['time'].slice(0,2);

    const today = [Wx[0], PoP[0], MinT[0], CI[0], MaxT[0]];
    const {data:todayData, date:todayDate} = getFinalData(today, 'today');

    const tomorrow = [Wx[1], PoP[1], MinT[1], CI[1], MaxT[1]];
    const {data:tomorrowData, date:tomorrowDate} = getFinalData(tomorrow, 'tomorrow');

    const weatherInfo = {
        "today": {
            "date": todayDate,
            "Wx": todayData[0],
            "PoP": todayData[1],
            "MinT": todayData[2],
            "CI": todayData[3],
            "MaxT": todayData[4]
        },
        "tomorrow": {
            "date": tomorrowDate,
            "Wx": tomorrowData[0],
            "PoP": tomorrowData[1],
            "MinT": tomorrowData[2],
            "CI": tomorrowData[3],
            "MaxT": tomorrowData[4],
        }
    }
    return weatherInfo
}
////


////  calculate GoB value to decide going out or not
function calculateGoB(weatherInfo, date){
    const data = weatherInfo[`${date}`];
    const wx = Number(data['Wx']['parameterValue']) * 4;
    const diff = Number(data['MaxT']['parameterName'] - data['MinT']['parameterName']) * 1;
    const pop = Number(data['PoP']['parameterName']) / 10 * 5;
    const GoB = (wx + diff + pop) / 10;

    if(GoB <= 4){
        recommendation = {
            "good": ["一日遊", "外出吃美食", "欣賞歷史古蹟", "外出購物振興經濟", "到南部玩", "洗衣曬被"],
            "bad": ["睡一整天", "叫 food panda", "在家寫程式", "在家吃泡麵", "網購逛蝦皮", "看 Netflix"],
        }
    }else if(GoB >4 && GoB <7){
        recommendation = {
            "good": ["睡到十點", "超市買泡麵", "看彭彭 YouTube 教學", "素顏出門", "不洗頭", "出門逛街"],
            "bad": ["睡到中午", "出門太久", "去海邊玩", "去基隆玩", "騎車出門", "出門不帶雨傘"],
        }
    }else{
        recommendation = {
            "good": ["叫 food panda", "躺在床上一整天", "睡到自然醒", "什麼事都不做", "看 Netflix", "熬夜寫程式"],
            "bad": ["外出覓食", "換下睡衣", "3C 產品沒電", "離開床超過一小時", "戶外運動", "曬衣服"],
        }
    }
    return recommendation
}
////
////////////////////////////////////////////////////////////////////////


//////////////////////////////////// View ////////////////////////////////////
function render(weatherData) {
}
////////////////////////////////////////////////////////////////////////


//////////////////////////////////// Controller ////////////////////////////////////
//// update information while user click on any other region
async function changeReigon(regionBtn) {
    let region = regionBtn.innerText;

    weatherData = {
        regionWeather: null,
        GoB: null
    };

    weatherData.regionWeather = await fetchWeather(region);
    weatherData.GoB = calculateGoB(weatherData.regionWeather, "today");

    render(weatherData, "today", region);
}
////


//// update information while user click on goTmrBtn
function changeDate(goTmrBtn) {
    let daytime = (goTmrBtn.id==='0') ? "today": "tomorrow"
    goTmrBtn.id = (goTmrBtn.id==='0') ? '1': '0';

    weatherData.GoB = calculateGoB(weatherData.regionWeather, daytime);

    render(weatherData, daytime);
}
////


//// initialize page contents
async function initializePage() {
    weatherData = {
        regionWeather: null,
        GoB: null
    };
    weatherData.regionWeather = await fetchWeather('高雄市');
    weatherData.GoB = calculateGoB(weatherData.regionWeather, "today");

    render(weatherData, "today");
}
////




//// after DOM contents are loaded, start to query interactable elements
document.addEventListener("DOMContentLoaded",  () => {
    initializePage();

    let regionBtns = document.querySelectorAll('.region');
    for(let i = 0; i < regionBtns.length; i++){
        regionBtns[i].addEventListener('click', function(){
            changeReigon(regionBtns[i]);
        });
    }

    let goTmrBtn = document.querySelector('.goTmrBtn');
    goTmrBtn.addEventListener('click', function(){
        changeDate(goTmrBtn);
    });
});
////
////////////////////////////////////////////////////////////////////////
