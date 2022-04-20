//// data diaplay
const init = async () => {
    data = await fetchWeather('高雄市');
    re = calculateGoB(data, 'today')
    console.log(data, re)

    data1 = await fetchWeather('宜蘭縣');
    re1 = calculateGoB(data1, 'today')
    // console.log(data1, re1)

    data2 = await fetchWeather('花蓮縣');
    re2 = calculateGoB(data2, 'today')

    data3 = await fetchWeather('臺東縣');
    re3 = calculateGoB(data3, 'today')

    data4 = await fetchWeather('澎湖縣');
    r4 = calculateGoB(data4, 'today')

    data5 = await fetchWeather('金門縣');
    re5 = calculateGoB(data5, 'today')

    data6 = await fetchWeather('連江縣');
    re6 = calculateGoB(data6, 'today')

    data7 = await fetchWeather('臺北市');
    re7 = calculateGoB(data7, 'today')

    data8 = await fetchWeather('新北市');
    re8 = calculateGoB(data8, 'today')

    data9 = await fetchWeather('桃園市');
    re9 = calculateGoB(data9, 'today')

    data10 = await fetchWeather('臺中市');
    re10 = calculateGoB(data10, 'today')

    data11 = await fetchWeather('臺南市');
    re11 = calculateGoB(data11, 'today')

    data12 = await fetchWeather('基隆市');
    re12 = calculateGoB(data12, 'today')

    data13 = await fetchWeather('新竹縣');
    re13 = calculateGoB(data13, 'today')

    data14 = await fetchWeather('新竹市');
    re14 = calculateGoB(data14, 'today')

    data15 = await fetchWeather('苗栗縣');
    re15 = calculateGoB(data15, 'today')

    data16 = await fetchWeather('彰化縣');
    re16 = calculateGoB(data16, 'today')

    data17 = await fetchWeather('南投縣');
    re17 = calculateGoB(data17, 'today')

    data18= await fetchWeather('雲林縣');
    re18 = calculateGoB(data18, 'today')

    data19 = await fetchWeather('嘉義縣');
    re19 = calculateGoB(data19, 'today')

    data20 = await fetchWeather('嘉義市');
    re20 = calculateGoB(data20, 'today')

    data21 = await fetchWeather('屏東縣');
    re21 = calculateGoB(data21, 'today')
}

// init();