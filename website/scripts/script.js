(async () => {
    total_data = await fetch('https://raw.githubusercontent.com/jamxu88/mocovid/main/server/dashboard.json', {
        headers: {
            'Cache-control': 'no-cache'
        }
    }).then(resp => resp.json())
    time_data = await fetch('https://raw.githubusercontent.com/jamxu88/mocovid/main/server/dateinfo.json', {
        headers: {
            'Cache-control': 'no-cache'
        }
    }).then(resp => resp.json())
    schooldate_data = await fetch ('https://raw.githubusercontent.com/jamxu88/mocovid/main/server/schooldateinfo.json', {
        headers: {
            'Cache-control': 'no-cache'
        }
    }).then(resp => resp.json())
    StackedChart = new StackedBarChart()
    PieChart = new PieChart()
    HeatMap = new Heatmap()
    LineChart = new LineChart()
    CaseLineChart = new CaseLineChart()

    StackedChart._setData(total_data)
    PieChart._setData(total_data)
    HeatMap._setData(time_data)
    LineChart._setData(schooldate_data, time_data)
    CaseLineChart._setData(schooldate_data, time_data)
    
    console.log('Data Loaded')
    check()
    
    document.getElementById('search').addEventListener('keyup', e => {
        if(e.key == 'Enter') search()
    })
    
})();

function search() {
    var getUrl = window.location;
    var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    window.location = baseUrl+`/?s=${document.getElementById('search').value}`
}
function check() {
    var params = new URLSearchParams(window.location.search)
    document.getElementById('search').value = params.get('s');
    if(params.get('s')) document.getElementById('name').innerText = `${params.get('s')} Overview`
    if(params.get('s')) StackedChart.filter = params.get('s').toLocaleLowerCase();
    StackedChart._setData(total_data)
    StackedChart._createChart()

    if(params.get('s')) HeatMap.filter = params.get('s').toLocaleLowerCase();
    HeatMap._setData(time_data)
    //HeatMap._createChart()

    if(params.get('s')) PieChart.filter = params.get('s').toLocaleLowerCase();
    PieChart._setData(total_data)
    PieChart._createChart()

    if(params.get('s')) LineChart.filter = params.get('s').toLocaleLowerCase();
    LineChart._setData(schooldate_data, time_data)
    LineChart._createChart()

    if(params.get('s')) CaseLineChart.filter = params.get('s').toLocaleLowerCase();
    CaseLineChart._setData(schooldate_data, time_data)
    CaseLineChart._createChart()

    //LineChart._createChart()
}

function renderHeatmap(){
    if(document.getElementById('heatmapToggle').innerText == 'View Heatmap') {
        HeatMap._createChart()
        document.getElementById('heatmapToggle').innerText = 'Hide Heatmap'
    }else {
        window.location.reload()
    }
    
}
