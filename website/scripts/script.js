
(async () => {
    var data = await fetch('https://raw.githubusercontent.com/jamxu88/mocovid/main/server/dashboard.json').then(resp => resp.json())
    const StackedChart = new StackedBarChart()
    StackedChart._setData(data)
    StackedChart._createChart()
})();
