// TODO create json in python to get date format in {school: {date: data, date1: data1, ...}, ...}
class LineChart {
    constructor() {
        this.filter = null
        this.chart = null
        this.options = {
            series: [
                {
                  name: "Active Cases",
                  data: []
                }
              ],
                chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                  enabled: true,
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
                text: 'Active Cases in ',
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
                  text: 'Positive Cases'
                },
                min: 5,
                max: 200
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
    _setData(data){
      var fdata = []
      var sumofdates = {}
      var schools = Object.keys(data)
      var dates = Object.keys(data[schools[0]])
      if (this.filter){
        schools.forEach(key => {
          if (key.toLowerCase().includes(this.filter)){
            Object.keys(data[key]).forEach(date => {
              if (date in sumofdates){
                sumofdates[date] += data[key][date]["Active Cases"]
              } else {
                sumofdates[date] = data[key][date]["Active Cases"]
              }
            })
          }
          fdata = Object.values(sumofdates)
        })
      } else {
        schools.forEach(key =>
          Object.keys(data[key]).forEach(date => {
            if (date in sumofdates){
              sumofdates[date] += data[key][date]["Active Cases"]
            } else {
              sumofdates[date] = data[key][date]["Active Cases"]
            }
          }))
          fdata = Object.values(sumofdates)
      }
      this.options.series.data = fdata
      this.options.xaxis.categories = dates
      this.options.chart.height = this.options.series.length * 30 < 200 ? 200 : this.options.series.length * 30
      this.options.chart.width = '80%'
    }
    _createChart() {
        this.chart = null;
        this.chart = new ApexCharts(document.querySelector("#linechart"), this.options);
        this.chart.render()
        console.log('Line Chart Rendered')
    }
    _updateChart() {
        this.chart.updateOptions(this.options)
    }
}