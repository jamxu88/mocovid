var data,StackedChart
(async () => {
    data = await fetch('https://raw.githubusercontent.com/jamxu88/mocovid/main/server/dashboard.json').then(resp => resp.json())
    StackedChart = new StackedBarChart()
    PieChart = new PieChart()
    StackedChart._setData(data)
    PieChart._setData(data)
    StackedChart._createChart()
    PieChart._createChart()
    console.log('Data Loaded')

    document.getElementById('search').addEventListener('keyup', e => {
        filter()
    })
    
})();
function filter() {
    StackedChart.filter = document.getElementById('search').value.toLowerCase()
    StackedChart._setData(data)
    StackedChart._updateChart()
}