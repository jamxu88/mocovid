class PieChart {
    constructor() {
        this.filter = null
        this.options = {
            series: [25, 15],
            chart: {
            width: '20%',
            type: 'pie',
          },
          colors: ['#36BE32', '#CD4C31'],
          labels: ["Negative", "Positive"],
          fill: {
            colors: ['#41EC3C', '#F75836']
          },
          plotOptions: {
            pie: {
              dataLabels: {
                offset: -2
              }
            }
          },
          title: {
            text: "Active COVID cases in MCPS (10 day period)",
            align: 'center'
          },
          dataLabels: {
            formatter(val, opts) {
              const name = opts.w.globals.labels[opts.seriesIndex]
              return [name, val.toFixed(1) + '%']
            }
          },
          tooltip: {
            fillSeriesColor: true
          },
          animations: {
              enabled: false
          },
          legend: {
            show: false
          }
        }
        this.chart = null

    }
    _setData(data){
        console.log('Set data')
        var positiveCases = 0
        var population = 0
        var schoolList = []
        data.forEach(school => {
            if(this.filter) {
                console.log(this.filter)
                if(school.school.toLowerCase().includes(this.filter)) {
                    positiveCases += school.active_cases_over_10_days
                    population += school.population
                    schoolList.push(school.school)
                }
            }else {
                positiveCases += school.active_cases_over_10_days
                population += school.population
                schoolList.push(school.school)
            }
            
        })
        this.options.series = [population - positiveCases, positiveCases]

    }
    _createChart() {
        console.log(this.options)
        this.chart = null;
        this.chart = new ApexCharts(document.querySelector("#chart"), this.options);
        this.chart.render()
        console.log('Chart Rendered')
    }
    _updateChart() {
        this.chart.updateOptions(this.options)
    }
}