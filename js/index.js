//////////////////////////////////// Global variables ////////////////////////////////////
//// avoid same index
let formalGoodIndex = "";
let formalBadIndex = "";
////
////////////////////////////////////////////////////////////////////////


//////////////////////////////////// Model ////////////////////////////////////
//// fetch weather information, needs to decide get today or tomorrow
//// today = 0; tomorrow = 1
async function fetchWeather(region, day){
    let url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B0C178E1-A2D1-4527-901A-22727190CF5E&locationName=${region}`;
    let accurateDate;

    const response = await fetch(url);
    const rawData = await response.json();

    const records = rawData['records']['location'][0]['weatherElement'];
    const Wx = records[0]['time'][day];
    const PoP = records[1]['time'][day];
    const MinT = records[2]['time'][day];
    const CI = records[3]['time'][day];
    const MaxT = records[4]['time'][day];


    const regionWeather = [Wx, PoP, MinT, CI, MaxT];

    const wetherData = regionWeather.map((item) => {
        const {startTime, endTime, parameter} = item;
        accurateDate = day===0? startTime.slice(0,10):endTime.slice(0,10);
        return parameter
    })
    
    const weatherInfo = {
        "region": region,
        "date": accurateDate,
        "Wx": wetherData[0],
        "PoP": wetherData[1],
        "MinT": wetherData[2],
        "CI": wetherData[3],
        "MaxT": wetherData[4],
    }

    return weatherInfo
}
////


////  calculate GoB value to decide going out or not
function calculateGoB(weatherData){
    const wx = Number(weatherData['Wx']['parameterValue']) * 4;
    const diff = Number(weatherData['MaxT']['parameterName'] - weatherData['MinT']['parameterName']) * 1;
    const pop = Number(weatherData['PoP']['parameterName']) / 10 * 5;
    const GoB = (wx + diff + pop) / 10;
    let trip = weatherData['region'] + '一日遊';


    if(GoB <= 4){
        recommendation = {
            "good": [trip, "外出吃美食", "欣賞歷史古蹟", "購物振興經濟", "到南部玩", "洗衣曬被", "做好防曬", "吃冰淇淋", "遊山玩水", "到柴山看猴子", "帶狗狗出門玩", "參加朋友聚會", "去有冷氣的地方", "尋找九天玄女", "外出打莫德納", "爬山去", "和家人出門玩", "去海邊看海"],
            "bad": ["睡一整天", "叫 foodPanda", "在家寫程式", "在家吃泡麵", "網購逛蝦皮", "看 Netflix", "用功讀書", "刷 Leetcode", "看 104","睡到快長高", "刷 CodeForce", "忽略熱指數","在陽光下太久", "騎摩托車", "看他人進度報告", "吃麻辣鍋", "在家用3C", "在家耍廢"],
        }
    }else if(GoB >4 && GoB <7){
        recommendation = {
            "good": ["睡到十點", "超市買泡麵", "看彭彭 YT 教學", "素顏出門", "不洗頭", "出門逛街", "吃飽睡，睡飽吃", "喝下午茶", "看電影", "唱歌", "看 Udemy 課程", "逛書店", "去酒吧喝酒", "等垃圾車", "家樂福坐按摩椅", "逛百貨公司", "吃早午餐", "跑步去"],
            "bad": ["睡到中午", "出門太久", "去海邊玩", "去基隆玩", "騎車出門", "出門不帶雨傘", "看悲傷電影", "忽略紫外線指數", "與人爭執", "出門不帶錢包", "不參加朋友聚會", "下車輸贏", "吸收太多咖啡因", "紅包錢給太少", "與他人比較", "穿新鞋出門", "整天待在室內", "去人多的地方"],
        }
    }else{
        recommendation = {
            "good": ["叫 foodPanda", "躺在床上一整天", "睡到自然醒", "什麼事都不做", "看 Netflix", "熬夜寫程式", "吸狗吸貓吸兔子", "開喝", "玩桌遊", "搶 PS5", "玩 Switch", "看 Disney+", "看直播抖內", "在家當肥宅", "買刮刮樂", "掛晴天娃娃", "檢查房子漏水", "門窗加固"],
            "bad": ["外出覓食", "換下睡衣", "3C 產品沒電", "離開床超過一小時", "戶外運動", "曬衣服", "修剪花草", "搬家", "登山衝浪", "泛舟", "帶狗狗出門", "騎車上班", "到垃圾", "上班/上學", "早睡！", "出門沒關窗戶", "小狗硬要出門", "沒準備存糧"],
        }
    }
    return recommendation
    
}
////


//// controller ONLY needs to call this function to get all weather info
//// e.g. getViewData("高雄市", 0); today = 0; tomorrow = 1
async function getViewData(region, day){
    const weatherData = await fetchWeather(region, day);
    const GoB = calculateGoB(weatherData);

    const weatherInfo = {
        "regionWeather": {
            "region": weatherData['region'],
            "Wx": weatherData['Wx']['parameterName'],
            "MaxT": Number(weatherData['MaxT']['parameterName']),
            "MinT": Number(weatherData['MinT']['parameterName']),
            "PoP": Number(weatherData['PoP']['parameterName']),
            "confort": weatherData['CI']['parameterName'],
            "date": {
                "month": Number(weatherData['date'].slice(5,7)),
                "date": Number(weatherData['date'].slice(8,10))
            },
            "GoB": GoB
        }
    }
    return weatherInfo
}
////
////////////////////////////////////////////////////////////////////////


//////////////////////////////////// View ////////////////////////////////////
//// render view
function render(weatherData) {
    let data = weatherData['regionWeather']
    document.getElementById("dateMonth").innerHTML = data['date']['month'];
    document.getElementById("taiwanRegion").innerHTML = data['region'];
    document.getElementById("Wx-text").innerHTML = data['Wx'];
    document.getElementById("temp-text").innerHTML = data['MaxT'] + ' / ' + data['MinT'] +'°C' ;
    document.getElementById("PoP-text").innerHTML = data['PoP'] + '%';
    document.getElementById("CI-text").innerHTML = data['confort'];
    document.getElementById("dateDate").innerHTML = data['date']['date'];
    getGoodIndex(weatherData);
    getBadIndex(weatherData);

}
////


//// avoid same index in goodActivity
function getGoodIndex(weatherData){
    let data = weatherData['regionWeather']
    let goodActivity = data['GoB']['good'];
    let index = Math.floor(Math.random() * goodActivity.length);
    let goodToDo = document.getElementById("goodActivity");
    if(index == formalGoodIndex){
        let newIndex = index + 1;
        if(newIndex == goodActivity.length){
            newIndex = 0;
            goodToDo.innerHTML = goodActivity[newIndex];
            formalGoodIndex = newIndex;
            return formalGoodIndex;
        }else{
            goodToDo.innerHTML = goodActivity[newIndex];
            formalGoodIndex = newIndex;
            return formalGoodIndex;
        }
    }else{
        goodToDo.innerHTML = goodActivity[index]; 
        formalGoodIndex = index;
        return formalGoodIndex;
    }
}
////


//// avoid same index in badActivity
function getBadIndex(weatherData){
    let data = weatherData['regionWeather']
    let badActivity = data['GoB']['bad'];
    let index = Math.floor(Math.random() * badActivity.length);
    let badToDo = document.getElementById("badActivity");
    if(index == formalBadIndex){
        let newIndex = index + 1;
        if(newIndex == badActivity.length){
            newIndex = 0;
            badToDo.innerHTML = badActivity[newIndex];
            formalBadIndex = newIndex;
            return formalBadIndex;
        }else{
            badToDo.innerHTML = badActivity[newIndex];
            formalBadIndex = newIndex;
            return formalBadIndex;
        }
    }else{
        badToDo.innerHTML = badActivity[index];
        formalBadIndex = index;
        return formalBadIndex;
    }
}
////


//// make regionMenu invisible
function DeactiveRegionMenu(){
    document.querySelector('.regionMenu').classList.remove('active');
    document.querySelector('.regionNow').classList.remove('active');
}
////


//// show RegionMenu when user click on regionNow
function showRegionMenu(){
    if (this.classList.contains('active')) {
        this.classList.remove('active');
        document.querySelector('.regionMenu').classList.remove('active');
    } else {
        this.classList.add('active');
        document.querySelector('.regionMenu').classList.add('active');
    }
}
////
////////////////////////////////////////////////////////////////////////


//////////////////////////////////// Controller ////////////////////////////////////
//// update information while user click on any other region
async function changeReigon(regionBtn) {
    const region = regionBtn.innerText;
    const weatherData = await getViewData(region, 0);

    DeactiveRegionMenu();
    render(weatherData);
}
////


//// update information while user click on goTmrBtn
async function changeDate(goTmrBtn) {
    goTmrBtn.id = (goTmrBtn.id==='0') ? '1': '0';
    const day = Number(goTmrBtn.id);
    const region = document.querySelector('.regionNow').innerText;
    
    const weatherData = await getViewData(region, day);

    render(weatherData);
}
////


//// initialize page contents
async function initializePage() {
    const weatherData = await getViewData("高雄市", 0);

    render(weatherData);
}
////


//// after DOM contents are loaded, start to query interactable elements
document.addEventListener("DOMContentLoaded",  () => {
    initializePage();

    const regionBtns = document.querySelectorAll('.region');
    for(let i = 0; i < regionBtns.length; i++){
        regionBtns[i].addEventListener('click', function(){
            changeReigon(regionBtns[i]);
        });
    }

    const goTmrBtn = document.querySelector('.goTmrBtn');
    goTmrBtn.addEventListener('click', function(){
        changeDate(goTmrBtn);
    });

    const regionNow = document.querySelector('.regionNow');
    regionNow.addEventListener('click', showRegionMenu);
});
////
////////////////////////////////////////////////////////////////////////
