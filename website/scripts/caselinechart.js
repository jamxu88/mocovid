

class CaseLineChart {
    constructor() {
        this.filter = null
        this.chart = null
        this.options = {
            series: [
                {
                  data: [],
                  name: undefined
                }
              ],
                chart: {
                height: '350',
                width:'50%',
                type: 'line',
                dropShadow: {
                  enabled: false,
                  color: '#000',
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 0.2
                },
                toolbar: {
                  show: false
                }
              },
              colors: ['#77B6EA', '#545454'],
              dataLabels: {
                enabled: true,
              },
              stroke: {
                curve: 'smooth'
              },
              title: {
                text: undefined,
                align: 'left'
              },
              grid: {
                borderColor: '#e7e7e7',
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              markers: {
                size: 1
              },
              xaxis: {
                categories: [],
                title: {
                  text: 'Date'
                }
              },
              yaxis: {
                title: {
                  text: 'Daily Cases'
                }
              },
              legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
              }
        }
    }
    _setData(data, datedata){
      var fdata = []
      var sumofdates = {}
      var schools = Object.keys(data)
      var dates = Object.keys(datedata).reverse()
      if (this.filter){
        schools.forEach(key => {
          if (key.toLowerCase().includes(this.filter)){
            Object.keys(data[key]).forEach(date => {
              if (date in sumofdates){
                sumofdates[date] += data[key][date]["Grand Total"]
              } else {
                sumofdates[date] = data[key][date]["Grand Total"]
              }
            })
          }
          fdata = Object.values(sumofdates)
          this.options.series[0].name = "Daily Cases in " + toTitleCase(this.filter)
          this.options.title.text = "Daily Cases in " + toTitleCase(this.filter)
        })
      } else {
        schools.forEach(key =>
          Object.keys(data[key]).forEach(date => {
            if (date in sumofdates){
              sumofdates[date] += data[key][date]["Grand Total"]
            } else {
              sumofdates[date] = data[key][date]["Grand Total"]
            }
          }))
          fdata = Object.values(sumofdates)
          this.options.series[0].name = "Daily Cases in MCPS"
          this.options.title.text = "Daily Cases in MCPS"
      }
      this.options.series[0].data = fdata
      this.options.xaxis.categories = dates
      
      this.options.chart.height = 500
      this.options.chart.width = '80%'
    }
    _createChart() {
        this.chart = null;
        this.chart = new ApexCharts(document.querySelector("#caselinechart"), this.options);
        this.chart.render()
        console.log('Line Chart Rendered')
    }
    _updateChart() {
        this.chart.updateOptions(this.options)
    }
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}