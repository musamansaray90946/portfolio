// Project 1: AgriAssist SL - JavaScript

// Initialize Chart.js
let expenseChart;

// Format currency
function formatCurrency(amount) {
    return 'Le ' + amount.toLocaleString('en-US');
}

// Update current date
function updateCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('currentDate').textContent = 
        now.toLocaleDateString('en-US', options);
}

// Initialize expense chart
function initExpenseChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    if (expenseChart) {
        expenseChart.destroy();
    }
    
    expenseChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Seeds & Fertilizer', 'Labor Costs', 'Equipment', 'Transportation', 'Other'],
            datasets: [{
                data: [450000, 850000, 300000, 150000, 50000],
                backgroundColor: [
                    '#4CAF50',
                    '#2196F3',
                    '#FF9800',
                    '#9C27B0',
                    '#F44336'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += formatCurrency(context.raw);
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// Simulate market price updates
function updateMarketPrices() {
    const trends = document.querySelectorAll('.trend-up, .trend-down, .trend-stable');
    
    trends.forEach(trend => {
        // Randomly update some prices
        if (Math.random() > 0.7) {
            const change = (Math.random() * 0.1 - 0.05).toFixed(2);
            const isPositive = change > 0;
            
            trend.innerHTML = `<i class="fas fa-arrow-${isPositive ? 'up' : 'down'}"></i> ${Math.abs(change * 100).toFixed(1)}%`;
            trend.className = isPositive ? 'trend-up' : 'trend-down';
        }
    });
}

// Task management
function setupTaskManagement() {
    const addTaskBtn = document.querySelector('.btn-add-task');
    const tasksList = document.querySelector('.tasks-list');
    
    addTaskBtn.addEventListener('click', function() {
        const taskText = prompt('Enter new task:');
        if (taskText && taskText.trim() !== '') {
            const taskId = 'task' + Date.now();
            const times = ['Morning', 'Afternoon', 'Evening', 'Anytime'];
            const randomTime = times[Math.floor(Math.random() * times.length)];
            
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <input type="checkbox" id="${taskId}">
                <label for="${taskId}">${taskText}</label>
                <span class="task-time">${randomTime}</span>
            `;
            
            tasksList.appendChild(taskItem);
            
            // Add event listener to new checkbox
            const checkbox = taskItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    taskItem.style.opacity = '0.6';
                    taskItem.style.textDecoration = 'line-through';
                } else {
                    taskItem.style.opacity = '1';
                    taskItem.style.textDecoration = 'none';
                }
            });
        }
    });
    
    // Add event listeners to existing checkboxes
    document.querySelectorAll('.task-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            if (this.checked) {
                taskItem.style.opacity = '0.6';
                taskItem.style.textDecoration = 'line-through';
            } else {
                taskItem.style.opacity = '1';
                taskItem.style.textDecoration = 'none';
            }
        });
    });
}

// Simulate weather updates
function simulateWeather() {
    const tempElement = document.querySelector('.temp');
    const conditionElement = document.querySelector('.condition');
    const humidityElement = document.querySelector('.humidity');
    
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'];
    const temps = [26, 28, 27, 25];
    const humidities = [60, 65, 70, 75];
    
    const randomIndex = Math.floor(Math.random() * conditions.length);
    
    // Smooth transition
    tempElement.style.opacity = '0.5';
    conditionElement.style.opacity = '0.5';
    humidityElement.style.opacity = '0.5';
    
    setTimeout(() => {
        tempElement.textContent = `${temps[randomIndex]}°C`;
        conditionElement.textContent = conditions[randomIndex];
        humidityElement.textContent = `Humidity: ${humidities[randomIndex]}%`;
        
        tempElement.style.opacity = '1';
        conditionElement.style.opacity = '1';
        humidityElement.style.opacity = '1';
    }, 300);
}

// Initialize crop growth animation
function animateCropGrowth() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const currentWidth = parseFloat(bar.style.width);
        const newWidth = Math.min(100, currentWidth + Math.random() * 5);
        
        bar.style.width = newWidth + '%';
        
        // Update text
        const progressText = bar.parentElement.nextElementSibling;
        if (progressText && progressText.classList.contains('progress-text')) {
            progressText.textContent = `${Math.round(newWidth)}% Growth`;
            
            if (newWidth >= 90) {
                progressText.textContent = 'Ready for Harvest';
                progressText.style.color = '#4CAF50';
                progressText.style.fontWeight = 'bold';
            }
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    initExpenseChart();
    setupTaskManagement();
    
    // Update market prices every 30 seconds
    setInterval(updateMarketPrices, 30000);
    
    // Update weather every minute
    setInterval(simulateWeather, 60000);
    
    // Animate crop growth every 10 seconds
    setInterval(animateCropGrowth, 10000);
    
    // Add hover effects to stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add navigation active state
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to section if it exists
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Login button functionality
    document.querySelector('.btn-login').addEventListener('click', function() {
        alert('Farmer login feature would connect to Supabase authentication system. In a real app, this would redirect to login page.');
    });
});