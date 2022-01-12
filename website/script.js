function showData() {
    const dataCanvas = document.createElement('p')
    dataCanvas.id = 'dataCanvas'
    dataCanvas.innerText = 'Test'
    if(!document.getElementById('dataCanvas')) document.getElementById('data').appendChild(dataCanvas)
}