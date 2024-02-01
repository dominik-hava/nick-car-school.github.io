const addDataButton = document.getElementById('add-data-button')
const clearTableButton = document.getElementById('clear-table-button')
const userInput = document.getElementById('question-number')
var columnValues = Array.from(document.querySelectorAll('#question-table td:first-child')).map(cell => cell.textContent)

clearTableButton.addEventListener('click', clearTable)
addDataButton.addEventListener('click', addData)
userInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        addData()
    }
})

document.addEventListener('DOMContentLoaded', function (event) {
    loadSavedData();
});

function clearTable() {
    var confirmation = confirm(`Do you really want to delete the whole table?`)
    if (confirmation) {
        var table = document.getElementById('question-table').getElementsByTagName('tbody')[0]
        table.innerHTML = ''
        columnValues = []
        saveToLocalStorage();
    }
}

function removeItem(row) {
    var confirmation = confirm(`Are you sure you want to delete question number "${row.cells[0].innerHTML}"?`)
    if (confirmation) {
        var table = document.getElementById('question-table').getElementsByTagName('tbody')[0]
        var rowIndex = row.rowIndex
        var questionNumber = row.cells[0].innerHTML
        var index = columnValues.findIndex(value => value === questionNumber)
        columnValues.splice(index, 1)
        table.deleteRow(rowIndex - 1)
        saveToLocalStorage()
    }
}

function addData() {
    // Get input value
    var questionNumber = userInput.value
    if (columnValues.map(value => value.toLowerCase()).includes(questionNumber.toLowerCase())) {
        alert(`Question number "${questionNumber}" already exists`)
        return
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
    columnValues.push(questionNumber)
    userInput.value = ''
    saveToLocalStorage();

    // Add click event listener to the row
    row.addEventListener('click', function (event) {
        if (event.target.type === 'checkbox') return
        removeItem(row)
    });
}

function loadSavedData() {
    var savedData = localStorage.getItem('learning-data')
    if (savedData) {
        var table = document.getElementById('question-table').getElementsByTagName('tbody')[0]
        table.innerHTML = savedData;
        columnValues = Array.from(document.querySelectorAll('#question-table td:first-child')).map(cell => cell.textContent)

        // Add click event listener to each row
        var rows = table.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
            rows[i].addEventListener('click', function () {
                removeItem(this);
            });
        }
    }
}

function saveToLocalStorage() {
    var table = document.getElementById('question-table').getElementsByTagName('tbody')[0]
    localStorage.setItem('learning-data', table.innerHTML)
}
