document.addEventListener('DOMContentLoaded', () => {
    // Select all nav items and sections
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const dashboardContainer = document.querySelector('.dashboard-container');

    // Function to activate a tab and apply active styles
    const activateTab = (targetId) => {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav items
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Highlight the corresponding nav item
        const activeNavItem = document.querySelector(`.nav-item[href="#${targetId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Apply styling changes specific to the active tab
        if (targetId === 'sentiment-analysis') {
            dashboardContainer.classList.add('sentiment-analysis-active');
        } else {
            dashboardContainer.classList.remove('sentiment-analysis-active');
        }
    };

    // Add event listeners to navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1); // Get ID without the '#'
            activateTab(targetId);
        });
    });

    // Optionally, activate the first tab by default
    if (navItems.length > 0) {
        const defaultTabId = navItems[0].getAttribute('href').substring(1);
        activateTab(defaultTabId);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const profileDropdownButton = document.getElementById("profileDropdownButton");
    const profileDropdown = document.getElementById("profileDropdown");

    // Toggle the profile dropdown menu
    profileDropdownButton.addEventListener("click", () => {
        profileDropdown.classList.toggle("show");
    });

    // Close the dropdown if clicked outside
    document.addEventListener("click", (event) => {
        if (!profileDropdownButton.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.classList.remove("show");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const currentDateElement = document.getElementById("current-date-text");
    
    // Get the current date in the format YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Set the text content of the currentDate element
    currentDateElement.textContent = currentDate;
});

document.addEventListener('DOMContentLoaded', () => {
    const trendChartCanvas = document.getElementById('sentimentTrendChart');
    if (trendChartCanvas) {
        const ctx = trendChartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023', '2024'], // Yearly labels
                datasets: [
                    {
                        label: 'Positive',
                        data: [60, 65, 70, 75, 80, 85],
                        borderColor: 'green',
                        backgroundColor: 'rgba(0, 128, 0, 0.1)',
                        fill: true,
                        tension: 0.4,
                    },
                    {
                        label: 'Neutral',
                        data: [30, 25, 20, 18, 15, 10],
                        borderColor: 'yellow',
                        backgroundColor: 'rgba(255, 165, 0, 0.1)',
                        fill: true,
                        tension: 0.4,
                    },
                    {
                        label: 'Negative',
                        data: [10, 10, 10, 7, 5, 5],
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        fill: true,
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Sentiment Percentage',
                        },
                    },
                },
            },
        });
    }
});

window.onload = function() {
    // Sample words and frequencies (you can replace these with actual data from the server)
    const words = [
        { text: 'Beach', weight: 10 },
        { text: 'Resort', weight: 8 },
        { text: 'Ocean', weight: 7 },
        { text: 'Relaxation', weight: 5 },
        { text: 'Adventure', weight: 4 },
        { text: 'Service', weight: 6 },
        { text: 'Ambiance', weight: 3 }
    ];

    // Set the options for the word cloud
    const options = {
        list: words.map(word => [word.text, word.weight]),  // Convert words to list of [text, weight]
        gridSize: 10,
        weightFactor: 3,
        fontFamily: 'Times, serif',
        color: 'random-light',
        backgroundColor: '#fff',
        rotateRatio: 0.5,
        rotationSteps: 5,
        shape: 'circle'
    };

    // Render the word cloud on the canvas
    WordCloud(document.getElementById('wordCloud'), options);
};

document.getElementById("export-button").addEventListener("click", function() {
    // Import the jsPDF library
    const { jsPDF } = window.jspdf;

    // Create a new PDF document
    const doc = new jsPDF();

    // Set title for PDF
    doc.setFontSize(20);
    doc.text("Sentiment Analysis Report", 20, 20);

    // Collect content to be included in the PDF
    const sentimentContent = document.getElementById("sentiment-content").innerText;

    // Add sentiment analysis data to the PDF
    doc.setFontSize(14);
    doc.text(sentimentContent, 20, 40);

    // Save the PDF with a specified filename
    doc.save("sentiment-analysis-report.pdf");
});

document.addEventListener("DOMContentLoaded", () => {
    // Sentiment Breakdown Chart
    var ctx = document.getElementById('sentimentBreakdownChart').getContext('2d');
    var sentimentBreakdownChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Positive', 'Neutral', 'Negative'], 
            datasets: [{
                data: [45, 35, 20], 
                backgroundColor: ['green', 'yellow', 'red'], 
                borderColor: ['#fff', '#fff', '#fff'], 
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false, 
                },
                tooltip: {
                    enabled: true, 
                },
                // Display percentages directly on the chart slices
                datalabels: {
                    color: '#fff', 
                    font: {
                        weight: 'bold', 
                        size: 16,
                    },
                    formatter: function(value, context) {
                        var total = context.dataset.data.reduce(function(sum, val) { return sum + val; }, 0);
                        var percentage = ((value / total) * 100).toFixed(0); 
                        return percentage + '%'; 
                    },
                    align: 'end', 
                    anchor: 'end', 
                    offset: 15,
                    borderColor: '#666', 
                    borderWidth: 1, 
                    borderDash: [3, 3],
                }
            }
        }
});

    // Top Positive & Negative Aspects (Example Data)
    const positiveAspects = ["Service", "Cleanliness", "Location", "Value for Money", "Ambiance"];
    const negativeAspects = ["Food Quality", "Room Size", "Check-in Process", "Noise Levels", "Parking"];

    const positiveList = document.getElementById("positive-aspects-list");
    const negativeList = document.getElementById("negative-aspects-list");

    positiveAspects.forEach(aspect => {
        const listItem = document.createElement("li");
        listItem.textContent = aspect;
        positiveList.appendChild(listItem);
    });

    negativeAspects.forEach(aspect => {
        const listItem = document.createElement("li");
        listItem.textContent = aspect;
        negativeList.appendChild(listItem);
    });
});
