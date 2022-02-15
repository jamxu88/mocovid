class Heatmap {
    constructor() {
        this.filter = null
        this.chart = null
        this.options = {
            chart: {
                type: 'heatmap',
                height: 5000,
                animations: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 1,
                colors: ['#e6e6e6']
            },
            colors: ["#013a66"],
            series: [{data:undefined}],
            title: {
                text: 'Postive Cases Heatmap'
            }
        }
    }
    _setData(data) {
        var fdata = {}
        var keys = Object.keys(data).reverse()
        keys.forEach(key => {
            if(this.filter) {
                data[key].forEach(school => {
                    if(school["School"] != 'TOTAL' && school["School"].toLowerCase() != 'grand total' && school['School'].toLowerCase().includes(this.filter)) {
                        !fdata[school["School"]] ? fdata[school["School"]] = {} : fdata[school["School"]] = fdata[school["School"]];
                        fdata[school["School"]][key] = school["Grand Total"]
                    }
                    
                })
            }else {
                data[key].forEach(school => {
                    if(school["School"] != 'TOTAL' && school["School"].toLowerCase() != 'grand total') {
                        !fdata[school["School"]] ? fdata[school["School"]] = {} : fdata[school["School"]] = fdata[school["School"]];
                        fdata[school["School"]][key] = school["Grand Total"]
                    }
                    
                })
            }
            
        })

        var akeys = Object.keys(fdata).reverse()
        var series = []
        akeys.forEach(key => {
            var data = []
            keys.forEach(date => {
                data.push({
                    x:date,
                    y:fdata[key][date] | 0
                })
            })
            series.push({
                name:key,
                data: data
            })
        })
        
        this.options.series = series
        this.options.chart.height = this.options.series.length * 30 < 200 ? 200 : this.options.series.length * 30
        this.options.chart.width = '80%'
    }
    _createChart() {
        this.chart = null;
        this.chart = new ApexCharts(document.querySelector("#heatmap"), this.options);
        this.chart.render()
        console.log('Chart Rendered')
    }
    _updateChart() {
        this.chart.updateOptions(this.options)
    }
}
