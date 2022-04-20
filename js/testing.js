//// data diaplay
const init = async () => {
    weatherData = await getViewData('高雄市', 0)
    console.log(weatherData)

    weatherData1 = await getViewData('宜蘭縣', 0)

    weatherData2 = await getViewData('花蓮縣', 0)

    weatherData3 = await getViewData('臺東縣', 0)

    weatherData4 = await getViewData('澎湖縣', 0)

    weatherData5 = await getViewData('金門縣', 0)

    weatherData6 = await getViewData('連江縣', 0)

    weatherData7 = await getViewData('臺北市', 0)

    weatherData8 = await getViewData('新北市', 0)

    weatherData9 = await getViewData('桃園市', 0)

    weatherData10 = await getViewData('臺中市', 0)

    weatherData11 = await getViewData('臺南市', 0)

    weatherData12 = await getViewData('基隆市', 0)

    weatherData13 = await getViewData('新竹縣', 0)

    weatherData14 = await getViewData('新竹市', 0)

    weatherData15 = await getViewData('苗栗縣', 0)

    weatherData16 = await getViewData('彰化縣', 0)

    weatherData17 = await getViewData('南投縣', 0)

    weatherData18 = await getViewData('雲林縣', 0)

    weatherData19 = await getViewData('嘉義縣', 0)

    weatherData20 = await getViewData('嘉義市', 0)

    weatherData21 = await getViewData('屏東縣', 0)
}

init();