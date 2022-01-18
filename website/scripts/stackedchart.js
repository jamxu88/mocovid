class StackedBarChart {
    constructor() {
        this.filter = null
        this.chart = null
        this.options = {
            chart: {
                type: 'bar',
                stacked: true,
                height: 5000,
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            title: {
                text: 'Active Cases per School'
            },
            series: [{
                data:undefined
            }],
            xaxis: {
                categories: undefined,
                labels: {
                    formatter: function (val) {
                        return val
                      }
                }
            },
            yaxis: {
                title: {
                  text: undefined
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
              }
        }
        
    }
    _setData(data) {
        console.log('Set data')
        var arr = []
        var staffCaseArray = []
        var studentCaseArray = []
        var schoolList = []
        data.forEach(school => {
            if(this.filter) {
                if(school.school.toLowerCase().includes(this.filter)) {
                    staffCaseArray.push(school.staff_cases_over_10_days)
                    studentCaseArray.push(school.student_cases_over_10_days)
                    schoolList.push(school.school)
                }
            }else {
                staffCaseArray.push(school.staff_cases_over_10_days)
                studentCaseArray.push(school.student_cases_over_10_days)
                schoolList.push(school.school)
            }
            
        })
        arr = [{
            name: 'Staff Cases',
            data: staffCaseArray,
            color:'#013a66'
        }, {
            name: 'Student Cases',
            data: studentCaseArray,
            color:'#8494a1'
        }]
        document.getElementById('studentCount').innerText = studentCaseArray.reduce(this._add,0)
        document.getElementById('staffCount').innerText = staffCaseArray.reduce(this._add,0)
        document.getElementById('totalCount').innerText = staffCaseArray.reduce(this._add,0) + studentCaseArray.reduce(this._add,0)
        this.options.chart.height = schoolList.length * 25 < 300 ? 300 : schoolList.length * 25
        this.options.series = arr
        this.options.xaxis.categories = schoolList
        //this.chart.updateOptions()
    }
    _add(accumulator, a) {
        return accumulator + a;
      }
    _createChart() {
        this.chart = null;
        this.chart = new ApexCharts(document.querySelector("#data"), this.options);
        this.chart.render()
        console.log('Chart Rendered')
    }
    _updateChart() {
        this.chart.updateOptions(this.options)
    }
}