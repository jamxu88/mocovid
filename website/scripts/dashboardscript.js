(async () => {
    total_data = await fetch('https://raw.githubusercontent.com/jamxu88/mocovid/main/server/dashboard.json').then(resp => resp.json())
    StackedChart = new StackedBarChart()
    StackedChart._setData(total_data)
    
    console.log('Data Loaded')
    check()
    
    document.getElementById('search').addEventListener('keyup', e => {
        if(e.key == 'Enter') search()
    })
    
})();
function search() {
    var getUrl = window.location;
    var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1] + "/dashboard.html";
    window.location = baseUrl+`/?s=${document.getElementById('search').value}`
}
function check() {
    var params = new URLSearchParams(window.location.search)
    document.getElementById('search').value = params.get('s');
    if(params.get('s')) document.getElementById('name').innerText = `${params.get('s')} Overview`
    if(params.get('s')) StackedChart.filter = params.get('s').toLocaleLowerCase();
    StackedChart._setData(total_data)
    StackedChart._createChart()

}
