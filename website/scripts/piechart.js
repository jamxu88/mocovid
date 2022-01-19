class PieChart {
    constructor() {
        this.filter = null
        this.options = {
            series: [25, 15],
            chart: {
            width: '450px',
            type: 'pie',
            animations: {
              enabled: false
            }
          },
          colors: ['#7992a6', '#013a66'],
          labels: ["Negative", "Positive"],
          fill: {
            colors: ['#8494a1', '#013a66'],
          },
          plotOptions: {
            pie: {
              dataLabels: {
                offset: -2
              }
            }
          },
          title: {
            text: `Active COVID cases (10 day period)`,
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
        var inc = []
        var prc = []
        var asc = []
        data.forEach(school => {
            if(this.filter) {
                console.log(this.filter)
                if(school.school.toLowerCase().includes(this.filter)) {
                    positiveCases += school.active_cases_over_10_days
                    population += school.population
                    schoolList.push(school.school)
                    inc.push(school.avg_total_cases_per_day)
                    prc.push(parseInt(school.active_percentages.replace('%','')))
                    asc.push(school.avg_staff_cases_per_day)
                }
            }else {
                positiveCases += school.active_cases_over_10_days
                population += school.population
                schoolList.push(school.school)
                inc.push(school.avg_total_cases_per_day)
                prc.push(parseInt(school.active_percentages.replace('%','')))
                asc.push(school.avg_staff_cases_per_day)
            }
            
      })
      this.options.series = [population - positiveCases, positiveCases]
      let ainc = inc.reduce(this._add,0) / inc.length
      let aprc = prc.reduce(this._add,0) / inc.length
      let aasc = asc.reduce(this._add,0) / inc.length
      console.log(`total cases per day: ${ainc}, percent: ${aprc}, staff cases per day: ${aasc}`)
      var prediction = aprc**2 + ainc * 10 + aasc ** 2
      document.getElementById('prediction').innerText = Math.ceil(prediction)
    }
    _add(accumulator, a) {
      return accumulator + a;
    }
    _createChart() {
        this.chart = null;
        this.chart = new ApexCharts(document.querySelector("#chart"), this.options);
        this.chart.render()
        document.getElementById('loading').style = 'display:none'
        console.log('Chart Rendered')
    }
    _updateChart() {
        document.getElementById('loading').style = 'display:none'
        this.chart.updateOptions(this.options)
    }
}