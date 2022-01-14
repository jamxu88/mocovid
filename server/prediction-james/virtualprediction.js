// Virtual Transition Prediction
const brain = require('brain.js');
const dataSet = require('../schooldateinfo.json')
class VirtualPrediction {
    constructor() {
        this.percentage = null;
        this.net = new brain.recurrent.LSTMTimeStep({
            inputSize: 2,
            hiddenLayers: [10],
            outputSize: 2,
        });
        this.trainingData = null;
        this.forecast = null;
        this.rundata = null;
    }
    _modelSetData(data) {
        this.trainingData = data
        // Training data format: [ [ [1,2][2,2],[3,2]...] , [ [1,2][2,2],[3,2]...] ]
        // Each 2nd array is a school's of data, each 3rd array is [day,case count]
    }
    _modelTrainModel() {
        this.net.train(this.trainingData, { log: true, errorThresh: 3.3 , iterations: 1000});
    }
    _modelRun(data) {
        this.rundata = this.net.run(data)
    }
    _modelForecast(givenData) {
        this.forecast = this.net.forecast(givenData,10)
        //console.log(this.forecast)
    }
    _analyze(data) {
        // Take in the following:
        // - % of school population infected
        // - # & % of staff infected (predict that >10 is a higher likelihood? Compare to total staff missing, also consider supporting services?)
        // - Trends in infections- an upwards correlation in the last 5 days may signify a higher likelihood of more infections
        // - Staff to student ratio: ~1:11.47
        // - Precedent from previous closings and guidelines
    }
}
var fdataset = []
function createDataSet() {
    var schools = Object.keys(dataSet)
    schools.forEach(school => {
        var arr = []
        var days = Object.keys(dataSet[school])
        days.forEach(day => {
            arr.push([parseInt(day.split('-')[2]),dataSet[school][day]["Grand Total"]])
        })
        fdataset.push(arr)
    })
    
}
createDataSet()
console.log(fdataset)
var prediction = new VirtualPrediction()
prediction._modelSetData(fdataset)
prediction._modelTrainModel()
prediction._modelForecast([[05,43],[06,25],[07,8],[08,0],[09,4]])
console.log(prediction.forecast)