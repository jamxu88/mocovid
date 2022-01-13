var total_data,StackedChart,time_data
(async () => {
    total_data = await fetch('https://raw.githubusercontent.com/jamxu88/mocovid/main/server/dashboard.json').then(resp => resp.json())
    time_data = await fetch('https://raw.githubusercontent.com/jamxu88/mocovid/main/server/dateinfo.json').then(resp => resp.json())
    StackedChart = new StackedBarChart()
    PieChart = new PieChart()
    HeatMap = new Heatmap()

    StackedChart._setData(total_data)
    PieChart._setData(total_data)
    HeatMap._setData(time_data)

    StackedChart._createChart()
    PieChart._createChart()
    HeatMap._createChart()
    console.log('Data Loaded')

    
    document.getElementById('search').addEventListener('keyup', e => {
        if(e.key == 'Enter') filter()
    })
    
})();

function filter() {
    StackedChart.filter = document.getElementById('search').value.toLowerCase()
    StackedChart._setData(total_data)
    StackedChart._updateChart()

    HeatMap.filter = document.getElementById('search').value.toLowerCase()
    HeatMap._setData(time_data)
    HeatMap._updateChart()
}