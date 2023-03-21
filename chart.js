// Get marks data from server and draw chart
fetch('marks-data.php')
    .then(response => response.json())
    .then(data => {
        const marks = data.map(item => item.marks);
        const dates = data.map(item => item.date);
        const ctx = document.getElementById('marks-chart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Marks',
                    data: marks,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 10
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 10,
                            max: 100
                        }
                    }]
                }
            }
        });
        updateProgressData(marks);
    })
    .catch(error => console.error(error));

// Update chart and progress data when new marks are submitted
document.getElementById('marks-form').addEventListener('submit', event => {
    event.preventDefault();
    const marks = document.getElementById('marks').value;
    fetch('marks-data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                marks
            })
        })
        .then(response => response.json())
        .then(data => {
            chart.data.labels.push(new Date().toLocaleDateString());
            chart.data.datasets[0].data.push(parseInt(marks));
            chart.update();
            updateProgressData(chart.data.datasets[0].data);
        })
        .catch(error => console.error(error));
});

// Calculate and display average and total marks for last week of data
function updateProgressData(marks) {
    const lastWeekMarks = marks.slice(-7);
    const averageMarks = lastWeekMarks.reduce((sum, mark) => sum + mark, 0) / lastWeekMarks.length;
    const totalMarks = lastWeekMarks.reduce((sum, mark) => sum + mark, 0);
    document.getElementById('average-marks').textContent = isNaN(averageMarks) ? 'N/A' : averageMarks.toFixed(2);
    document.getElementById('total-marks').textContent = isNaN(totalMarks) ? 'N/A' : totalMarks;
}

// Initialize the chart and progress info on page load
function submitMarksForm(event) {
    event.preventDefault();
    const marksInput = document.getElementById('marks-input');
    const marks = Number(marksInput.value);
    if (marks >= 0 && marks <= 100) {
        marksData.push(marks);
        localStorage.setItem('marksData', JSON.stringify(marksData));
        marksInput.value = '';
        updateChart();
        updateProgressInfo();
    } else {
        alert('Please enter a valid number between 0 and 100');
    }
}

updateChart();
updateProgressInfo();