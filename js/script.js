const addDataButton = document.getElementById('add-data-button')
const clearTableButton = document.getElementById('clear-table-button')
const userInput = document.getElementById('question-number')
clearTableButton.addEventListener('click', clearTable)
addDataButton.addEventListener('click', addData)
userInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        addData()
    }
}
)
document.addEventListener('DOMContentLoaded', function (event) {
    loadSavedData();
});
function clearTable() {
    var table = document.getElementById('question-table').getElementsByTagName('tbody')[0]
    table.innerHTML = ''
    saveToLocalStorage();
}
function addData() {
    // Get input value
    var questionNumber = userInput.value
    var columnValues = Array.from(document.querySelectorAll('#question-table td:first-child')).map(cell => cell.textContent)
    console.log(columnValues)
    for(let columnValue in columnValues) {
        if (columnValue === questionNumber) {
            alert(`Question number "${questionNumber}" already exists`)
            return
        }
    }
    // Validate input
    if (!questionNumber) {
        alert('Please enter a question number')
        return
    }

    // Add row to the table
    var table = document.getElementById('question-table').getElementsByTagName('tbody')[0]
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = questionNumber;
    cell2.innerHTML = '<input type="checkbox">'
    saveToLocalStorage();
}

function loadSavedData() {
    var savedData = localStorage.getItem('learning-data')
    if (savedData) {
        var table = document.getElementById('question-table').getElementsByTagName('tbody')[0]
        table.innerHTML = savedData;
    }
}

function saveToLocalStorage() {
    var table = document.getElementById('question-table').getElementsByTagName('tbody')[0]
    localStorage.setItem('learning-data', table.innerHTML)
}

