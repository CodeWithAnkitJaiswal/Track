// Get the marks form and input field
const marksForm = document.getElementById('marks-form');
const marksInput = document.getElementById('marks-input');
const clearBtnGraph = document.getElementById("clear-graph");

// Get the progress info and chart canvas
const progressInfo = document.getElementById('progress-info');
const marksChart = document.getElementById('marks-chart');

// Define variables for the chart
let chart;
let chartData = [];

// Retrieve saved chart data from localStorage if it exists
if (localStorage.getItem('chartData')) {
    chartData = JSON.parse(localStorage.getItem('chartData'));
}

// Function to update the chart with new data
function updateChart() {
    chart = new Chart(marksChart, {
        type: 'bar',
        data: {
            labels: chartData.map(data => data.date),
            datasets: [{
                label: 'Marks',
                data: chartData.map(data => data.marks),
                backgroundColor: '#ffc107'
            }]
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 100
                    }
                }]
            }
        }
    });
}

// Function to update the progress info
function updateProgressInfo() {
    const latestData = chartData[chartData.length - 1];
    progressInfo.textContent = `You scored ${latestData.marks} out of 100 on ${latestData.date}.`;
}

// Function to add new data to the chart and update localStorage
function addData(marks) {
    const date = new Date().toLocaleDateString();
    chartData.push({ date, marks });
    localStorage.setItem('chartData', JSON.stringify(chartData));
}

// Event listener for when the marks form is submitted
marksForm.addEventListener('submit', e => {
    e.preventDefault();
    const marks = parseInt(marksInput.value);
    addData(marks);
    updateChart();
    updateProgressInfo();
    marksInput.value = '';
});

// Clear graph list
clearBtnGraph.addEventListener("click", function() {

    itemData = [];
    localStorage.removeItem("chartData");
    itemList.classList.add("animated", "zoomOutLeft");

    function deleteLocalstorage() {
        const items = itemList.querySelectorAll("#marks-chart");
        if (items.length > 0) {
            items.forEach(function(item) {
                itemList.removeChild(item);
            });
        }
    }
});