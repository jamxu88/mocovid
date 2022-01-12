
(async () => {
    var data = await fetch('../../server/dashboard.json').then(resp => resp.json())
    const StackedChart = new StackedBarChart()
    StackedChart._setData(data)
    StackedChart._createChart()
})();
