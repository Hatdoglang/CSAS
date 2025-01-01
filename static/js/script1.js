document.addEventListener('DOMContentLoaded', function () {
    // Initialize Sentiment Chart
    const sentimentCtx = document.getElementById('sentimentChart').getContext('2d');
    const sentimentChart = new Chart(sentimentCtx, {
        type: 'pie',
        data: sentimentData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });

    // Initialize Aspect Chart
    const aspectCtx = document.getElementById('aspectChart').getContext('2d');
    const aspectChart = new Chart(aspectCtx, {
        type: 'bar',
        data: aspectData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Handle resort selection
    document.getElementById('resortDropdown').addEventListener('change', function () {
        const selectedResort = this.value;

        // Logic to update charts or data based on the selected resort
        updateChartsForResort(selectedResort);
    });

    // Function to update charts (this can be customized to change chart data based on resort)
    function updateChartsForResort(resort) {
        if (resort === "Dahican Surf Resort") {
            sentimentData.datasets[0].data = [50, 30, 20];
            aspectData.datasets[0].data = [70, 60, 80, 85, 65];
            aspectData.datasets[1].data = [30, 40, 20, 15, 35];
        } else if (resort === "Blue Bless Beach Resort") {
            sentimentData.datasets[0].data = [60, 25, 15];
            aspectData.datasets[0].data = [80, 70, 60, 85, 75];
            aspectData.datasets[1].data = [20, 30, 40, 15, 25];
        }

        // Update the data and re-render the charts
        sentimentChart.data = sentimentData;
        sentimentChart.update();

        aspectChart.data = aspectData;
        aspectChart.update();
    }
});
