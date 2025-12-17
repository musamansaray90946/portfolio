// Weather App - JavaScript

// Weather Data
let weatherData = {
    current: {
        location: "Freetown, Sierra Leone",
        temperature: 32,
        feels_like: 34,
        condition: "Sunny",
        icon: "sunny",
        humidity: 65,
        wind_speed: 12,
        wind_direction: "NE",
        pressure: 1013,
        visibility: 10,
        uv_index: 7,
        sunrise: "06:45",
        sunset: "18:30",
        precipitation: 0,
        last_updated: new Date().toISOString()
    },
    hourly: [],
    daily: [],
    air_quality: {
        aqi: 45,
        pm25: 12,
        pm10: 25,
        o3: 45,
        no2: 18
    },
    alerts: [],
    map_layers: {}
};

// App State
let currentUnit = 'metric';
let currentMapLayer = 'temperature';
let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
let map = null;
let weatherLayer = null;

// Initialize App
async function initWeatherApp() {
    showLoadingScreen();
    
    // Initialize data
    await loadWeatherData();
    await loadAirQualityData();
    await loadForecastData();
    await loadAlerts();
    await loadNews();
    
    // Initialize map
    initWeatherMap();
    
    // Render all components
    renderCurrentWeather();
    renderHourlyForecast();
    renderDailyForecast();
    renderAirQuality();
    renderAlerts();
    renderFavorites();
    renderSearchHistory();
    renderNews();
    updateTime();
    
    // Setup event listeners
    setupEventListeners();
    
    // Hide loading screen
    hideLoadingScreen();
    
    // Start auto-update
    startAutoUpdate();
}

// Show Loading Screen
function showLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'flex';
}

// Hide Loading Screen
function hideLoadingScreen() {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            document.querySelector('.app-container').style.opacity = '1';
        }, 300);
    }, 1000);
}

// Load Weather Data
async function loadWeatherData() {
    // In a real app, this would fetch from API
    // For demo, we'll use mock data
    const mockHourlyData = [];
    const mockDailyData = [];
    
    // Generate hourly data
    const now = new Date();
    for (let i = 0; i < 24; i++) {
        const hour = new Date(now.getTime() + i * 60 * 60 * 1000);
        mockHourlyData.push({
            time: hour.getHours() + ':00',
            temperature: Math.floor(Math.random() * 10) + 28,
            condition: i < 6 ? 'Sunny' : i < 12 ? 'Cloudy' : i < 18 ? 'Partly Cloudy' : 'Clear',
            icon: i < 6 ? 'sun' : i < 12 ? 'cloud' : i < 18 ? 'cloud-sun' : 'moon',
            precipitation: Math.random() > 0.7 ? Math.floor(Math.random() * 30) : 0
        });
    }
    
    // Generate daily data
    const days = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (let i = 0; i < 7; i++) {
        mockDailyData.push({
            day: days[i],
            high: Math.floor(Math.random() * 8) + 30,
            low: Math.floor(Math.random() * 8) + 22,
            condition: ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 5)],
            icon: ['sun', 'cloud', 'cloud-sun', 'cloud-rain', 'bolt'][Math.floor(Math.random() * 5)],
            precipitation: Math.floor(Math.random() * 90)
        });
    }
    
    weatherData.hourly = mockHourlyData;
    weatherData.daily = mockDailyData;
    
    // Update last updated time
    weatherData.current.last_updated = new Date().toISOString();
}

// Load Air Quality Data
async function loadAirQualityData() {
    // Mock air quality data
    weatherData.air_quality = {
        aqi: 45 + Math.floor(Math.random() * 10),
        pm25: 12 + Math.floor(Math.random() * 5),
        pm10: 25 + Math.floor(Math.random() * 10),
        o3: 45 + Math.floor(Math.random() * 15),
        no2: 18 + Math.floor(Math.random() * 7),
        co: 0.8 + Math.random() * 0.2
    };
}

// Load Forecast Data
async function loadForecastData() {
    // This would fetch from API in real app
    console.log('Forecast data loaded');
}

// Load Alerts
async function loadAlerts() {
    // Mock weather alerts
    weatherData.alerts = [
        {
            id: 1,
            title: "High UV Index Warning",
            description: "UV index is very high today. Please use sunscreen and limit sun exposure.",
            severity: "warning",
            time: "2 hours ago"
        },
        {
            id: 2,
            title: "Heat Advisory",
            description: "Temperatures expected to reach 35°C today. Stay hydrated and avoid outdoor activities during peak hours.",
            severity: "moderate",
            time: "1 day ago"
        }
    ];
}

// Load News
async function loadNews() {
    // This would fetch from API in real app
    console.log('News loaded');
}

// Initialize Weather Map
function initWeatherMap() {
    // Initialize Leaflet map
    map = L.map('weatherMap').setView([8.484, -13.229], 10); // Freetown coordinates
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add weather layer
    updateMapLayer();
}

// Update Map Layer
function updateMapLayer() {
    // Remove existing layer
    if (weatherLayer) {
        map.removeLayer(weatherLayer);
    }
    
    // Add new layer based on selection
    switch(currentMapLayer) {
        case 'temperature':
            // Add temperature heatmap (mock)
            weatherLayer = L.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid={apiKey}', {
                apiKey: 'demo', // Use demo key for mock
                attribution: '© OpenWeatherMap'
            }).addTo(map);
            updateMapLegend('Temperature', ['°C', '#4299e1', '#ed8936', '#f56565'], ['20', '25', '30', '35']);
            break;
            
        case 'precipitation':
            // Add precipitation layer
            weatherLayer = L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid={apiKey}', {
                apiKey: 'demo',
                attribution: '© OpenWeatherMap'
            }).addTo(map);
            updateMapLegend('Precipitation', ['mm', '#4299e1', '#3182ce', '#2c5282'], ['0', '5', '10', '15']);
            break;
            
        case 'wind':
            // Add wind layer
            weatherLayer = L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid={apiKey}', {
                apiKey: 'demo',
                attribution: '© OpenWeatherMap'
            }).addTo(map);
            updateMapLegend('Wind Speed', ['km/h', '#a0aec0', '#718096', '#4a5568'], ['0', '10', '20', '30']);
            break;
            
        case 'clouds':
            // Add cloud layer
            weatherLayer = L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid={apiKey}', {
                apiKey: 'demo',
                attribution: '© OpenWeatherMap'
            }).addTo(map);
            updateMapLegend('Cloud Coverage', ['%', '#cbd5e0', '#a0aec0', '#718096'], ['0', '50', '75', '100']);
            break;
    }
}

// Update Map Legend
function updateMapLegend(title, colors, values) {
    const legend = document.getElementById('mapLegend');
    legend.innerHTML = `
        <div class="legend-title">${title}</div>
        <div class="legend-scale">
            <div class="legend-item" style="background: ${colors[1]}"></div>
            <div class="legend-item" style="background: ${colors[2]}"></div>
            <div class="legend-item" style="background: ${colors[3]}"></div>
        </div>
        <div class="legend-labels">
            <span>${values[0]}${colors[0]}</span>
            <span>${values[2]}${colors[0]}</span>
        </div>
    `;
}

// Render Current Weather
function renderCurrentWeather() {
    const current = weatherData.current;
    const unitSymbol = currentUnit === 'metric' ? '°C' : '°F';
    
    // Update location
    document.getElementById('currentLocation').textContent = current.location;
    
    // Update temperature
    let temp = current.temperature;
    let feelsLike = current.feels_like;
    
    if (currentUnit === 'imperial') {
        temp = celsiusToFahrenheit(temp);
        feelsLike = celsiusToFahrenheit(feelsLike);
    }
    
    document.getElementById('currentTemp').textContent = `${Math.round(temp)}${unitSymbol}`;
    document.getElementById('currentCondition').textContent = current.condition;
    document.getElementById('feelsLike').textContent = `${Math.round(feelsLike)}${unitSymbol}`;
    
    // Update icon
    const iconElement = document.getElementById('currentIcon');
    iconElement.className = `condition-icon ${current.icon}`;
    iconElement.innerHTML = getWeatherIcon(current.icon);
    
    // Update details
    const windUnit = currentUnit === 'metric' ? 'km/h' : 'mph';
    const windSpeed = currentUnit === 'metric' ? current.wind_speed : kmhToMph(current.wind_speed);
    
    document.getElementById('windSpeed').textContent = `${Math.round(windSpeed)} ${windUnit} ${current.wind_direction}`;
    document.getElementById('humidity').textContent = `${current.humidity}%`;
    document.getElementById('pressure').textContent = `${current.pressure} hPa`;
    
    const visibility = currentUnit === 'metric' ? current.visibility : kmToMiles(current.visibility);
    const visibilityUnit = currentUnit === 'metric' ? 'km' : 'mi';
    document.getElementById('visibility').textContent = `${visibility} ${visibilityUnit}`;
    
    document.getElementById('uvIndex').textContent = current.uv_index;
    document.getElementById('uvIndex').className = `detail-value ${getUvClass(current.uv_index)}`;
    
    document.getElementById('sunrise').textContent = current.sunrise;
    document.getElementById('sunset').textContent = current.sunset;
    document.getElementById('precipitation').textContent = `${current.precipitation}%`;
}

// Get Weather Icon
function getWeatherIcon(condition) {
    const icons = {
        'sunny': '<i class="fas fa-sun"></i>',
        'cloudy': '<i class="fas fa-cloud"></i>',
        'partly-cloudy': '<i class="fas fa-cloud-sun"></i>',
        'rainy': '<i class="fas fa-cloud-rain"></i>',
        'stormy': '<i class="fas fa-bolt"></i>',
        'snowy': '<i class="fas fa-snowflake"></i>',
        'windy': '<i class="fas fa-wind"></i>',
        'foggy': '<i class="fas fa-smog"></i>',
        'clear-night': '<i class="fas fa-moon"></i>'
    };
    
    return icons[condition] || icons.sunny;
}

// Get UV Index Class
function getUvClass(uvIndex) {
    if (uvIndex <= 2) return 'uv-low';
    if (uvIndex <= 5) return 'uv-moderate';
    if (uvIndex <= 7) return 'uv-high';
    if (uvIndex <= 10) return 'uv-very-high';
    return 'uv-extreme';
}

// Render Hourly Forecast
function renderHourlyForecast() {
    const container = document.getElementById('hourlyForecast');
    const hours = weatherData.hourly.slice(0, 12); // Show next 12 hours
    
    container.innerHTML = '';
    
    hours.forEach(hour => {
        const hourElement = document.createElement('div');
        hourElement.className = 'hour-item';
        
        let temp = hour.temperature;
        if (currentUnit === 'imperial') {
            temp = celsiusToFahrenheit(temp);
        }
        
        hourElement.innerHTML = `
            <div class="hour-time">${hour.time}</div>
            <div class="hour-icon">${getWeatherIcon(hour.icon)}</div>
            <div class="hour-temp">${Math.round(temp)}${currentUnit === 'metric' ? '°C' : '°F'}</div>
            <div class="hour-precipitation">${hour.precipitation}%</div>
        `;
        
        container.appendChild(hourElement);
    });
}

// Render Daily Forecast
function renderDailyForecast() {
    const container = document.getElementById('dailyForecast');
    
    container.innerHTML = '';
    
    weatherData.daily.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day-item';
        
        let high = day.high;
        let low = day.low;
        
        if (currentUnit === 'imperial') {
            high = celsiusToFahrenheit(high);
            low = celsiusToFahrenheit(low);
        }
        
        dayElement.innerHTML = `
            <div class="day-name">${day.day}</div>
            <div class="day-icon">${getWeatherIcon(day.icon)}</div>
            <div class="day-temps">
                <span class="day-high">${Math.round(high)}°</span>
                <span class="day-low">${Math.round(low)}°</span>
            </div>
            <div class="day-precipitation">${day.precipitation}%</div>
        `;
        
        container.appendChild(dayElement);
    });
}

// Render Air Quality
function renderAirQuality() {
    const aqi = weatherData.air_quality.aqi;
    const container = document.getElementById('aqiValue');
    const indicator = document.getElementById('aqiIndicator');
    
    // Update AQI value
    const aqiClass = getAqiClass(aqi);
    const aqiLabel = getAqiLabel(aqi);
    
    container.innerHTML = `
        <span class="aqi-number" style="color: ${aqiClass.color}">${aqi}</span>
        <span class="aqi-label" style="background: ${aqiClass.background}; color: ${aqiClass.color}">${aqiLabel}</span>
    `;
    
    // Update indicator position (0-100% scale)
    const position = Math.min(aqi / 2, 100); // AQI goes up to 500
    indicator.style.width = `${position}%`;
    
    // Update pollutant values
    const pollutants = document.querySelectorAll('.pollutant-value');
    const bars = document.querySelectorAll('.bar-fill');
    
    if (pollutants.length >= 4 && bars.length >= 4) {
        pollutants[0].textContent = `${weatherData.air_quality.pm25} µg/m³`;
        pollutants[1].textContent = `${weatherData.air_quality.pm10} µg/m³`;
        pollutants[2].textContent = `${weatherData.air_quality.o3} µg/m³`;
        pollutants[3].textContent = `${weatherData.air_quality.no2} µg/m³`;
        
        bars[0].style.width = `${Math.min(weatherData.air_quality.pm25 / 50 * 100, 100)}%`;
        bars[1].style.width = `${Math.min(weatherData.air_quality.pm10 / 100 * 100, 100)}%`;
        bars[2].style.width = `${Math.min(weatherData.air_quality.o3 / 100 * 100, 100)}%`;
        bars[3].style.width = `${Math.min(weatherData.air_quality.no2 / 50 * 100, 100)}%`;
    }
}

// Get AQI Class
function getAqiClass(aqi) {
    if (aqi <= 50) return { color: '#00e400', background: 'rgba(0, 228, 0, 0.1)' };
    if (aqi <= 100) return { color: '#ffff00', background: 'rgba(255, 255, 0, 0.1)' };
    if (aqi <= 150) return { color: '#ff7e00', background: 'rgba(255, 126, 0, 0.1)' };
    if (aqi <= 200) return { color: '#ff0000', background: 'rgba(255, 0, 0, 0.1)' };
    if (aqi <= 300) return { color: '#8f3f97', background: 'rgba(143, 63, 151, 0.1)' };
    return { color: '#7e0023', background: 'rgba(126, 0, 35, 0.1)' };
}

// Get AQI Label
function getAqiLabel(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
}

// Render Alerts
function renderAlerts() {
    const container = document.getElementById('alertList');
    const countElement = document.getElementById('alertCount');
    
    countElement.textContent = `${weatherData.alerts.length} Active`;
    container.innerHTML = '';
    
    weatherData.alerts.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert-item';
        
        alertElement.innerHTML = `
            <div class="alert-header">
                <div class="alert-title">${alert.title}</div>
                <div class="alert-time">${alert.time}</div>
            </div>
            <div class="alert-description">${alert.description}</div>
        `;
        
        container.appendChild(alertElement);
    });
}

// Render Favorites
function renderFavorites() {
    const container = document.getElementById('favoritesGrid');
    
    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="empty-favorites">
                <i class="fas fa-star"></i>
                <p>No favorite locations yet</p>
                <p>Click "Add Current" to save locations</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    favorites.forEach(fav => {
        const favElement = document.createElement('div');
        favElement.className = 'favorite-item';
        favElement.dataset.id = fav.id;
        
        let temp = fav.temperature;
        if (currentUnit === 'imperial') {
            temp = celsiusToFahrenheit(temp);
        }
        
        favElement.innerHTML = `
            <button class="btn-remove-favorite" onclick="removeFavorite('${fav.id}')">
                <i class="fas fa-times"></i>
            </button>
            <div class="favorite-name">${fav.nickname || fav.location}</div>
            <div class="favorite-temp">${Math.round(temp)}${currentUnit === 'metric' ? '°C' : '°F'}</div>
            <div class="favorite-condition">${fav.condition}</div>
        `;
        
        favElement.addEventListener('click', () => {
            searchLocation(fav.location);
        });
        
        container.appendChild(favElement);
    });
}

// Render Search History
function renderSearchHistory() {
    const container = document.getElementById('searchHistory');
    
    if (searchHistory.length === 0) {
        container.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-history"></i>
                <p>No search history yet</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    // Show last 5 searches
    const recentSearches = searchHistory.slice(-5).reverse();
    
    recentSearches.forEach(search => {
        const searchElement = document.createElement('div');
        searchElement.className = 'search-item';
        
        searchElement.innerHTML = `
            <div class="search-location">${search.location}</div>
            <div class="search-time">${formatTimeAgo(search.timestamp)}</div>
        `;
        
        searchElement.addEventListener('click', () => {
            searchLocation(search.location);
        });
        
        container.appendChild(searchElement);
    });
}

// Render News
function renderNews() {
    const container = document.getElementById('newsGrid');
    
    const newsItems = [
        {
            id: 1,
            title: "Record Heatwave Hits West Africa",
            source: "Weather Network",
            icon: "sun"
        },
        {
            id: 2,
            title: "Hurricane Season Predictions Updated",
            source: "Climate Center",
            icon: "wind"
        },
        {
            id: 3,
            title: "New Weather Satellite Launched",
            source: "Space News",
            icon: "satellite"
        }
    ];
    
    container.innerHTML = '';
    
    newsItems.forEach(news => {
        const newsElement = document.createElement('div');
        newsElement.className = 'news-item';
        
        newsElement.innerHTML = `
            <div class="news-image" style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);">
                <i class="fas fa-${news.icon}"></i>
            </div>
            <div class="news-content">
                <div class="news-title">${news.title}</div>
                <div class="news-source">
                    <i class="fas fa-newspaper"></i> ${news.source}
                </div>
            </div>
        `;
        
        newsElement.addEventListener('click', () => {
            showNewsDetail(news.id);
        });
        
        container.appendChild(newsElement);
    });
}

// Update Time
function updateTime() {
    const now = new Date();
    
    // Update date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
    
    // Update time
    document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
    });
    
    // Update last updated
    const lastUpdated = new Date(weatherData.current.last_updated);
    const timeDiff = Math.floor((now - lastUpdated) / 60000); // minutes
    
    if (timeDiff < 1) {
        document.getElementById('lastUpdated').textContent = 'Just now';
    } else if (timeDiff < 60) {
        document.getElementById('lastUpdated').textContent = `${timeDiff} minutes ago`;
    } else {
        document.getElementById('lastUpdated').textContent = lastUpdated.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Search Location
async function searchLocation(query) {
    if (!query.trim()) return;
    
    showLoadingScreen();
    
    // Add to search history
    addToSearchHistory(query);
    
    // In real app, this would fetch from geocoding API
    // For demo, simulate API call
    setTimeout(async () => {
        // Update current location
        weatherData.current.location = query;
        
        // Generate new weather data
        await loadWeatherData();
        await loadAirQualityData();
        
        // Update UI
        renderCurrentWeather();
        renderHourlyForecast();
        renderDailyForecast();
        renderAirQuality();
        
        // Update map center
        if (map) {
            // Mock coordinates for demo
            const mockCoords = [
                [8.484 + (Math.random() - 0.5) * 2, -13.229 + (Math.random() - 0.5) * 2],
                [14.692 + (Math.random() - 0.5) * 2, -17.447 + (Math.random() - 0.5) * 2],
                [9.082 + (Math.random() - 0.5) * 2, 7.675 + (Math.random() - 0.5) * 2]
            ];
            
            const randomCoords = mockCoords[Math.floor(Math.random() * mockCoords.length)];
            map.setView(randomCoords, 10);
            
            // Add marker
            L.marker(randomCoords).addTo(map)
                .bindPopup(`<b>${query}</b><br>${weatherData.current.temperature}°C`)
                .openPopup();
        }
        
        hideLoadingScreen();
        showNotification(`Weather data for ${query} loaded successfully`);
    }, 1500);
}

// Add to Search History
function addToSearchHistory(location) {
    const existingIndex = searchHistory.findIndex(item => 
        item.location.toLowerCase() === location.toLowerCase()
    );
    
    if (existingIndex !== -1) {
        searchHistory.splice(existingIndex, 1);
    }
    
    searchHistory.push({
        location,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 20 searches
    if (searchHistory.length > 20) {
        searchHistory.shift();
    }
    
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderSearchHistory();
}

// Clear Search History
function clearSearchHistory() {
    if (confirm('Are you sure you want to clear all search history?')) {
        searchHistory = [];
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        renderSearchHistory();
        showNotification('Search history cleared');
    }
}

// Add Favorite
function addFavorite() {
    const location = weatherData.current.location;
    const nickname = document.getElementById('favoriteNickname').value.trim() || location;
    
    const newFavorite = {
        id: Date.now().toString(),
        location,
        nickname,
        temperature: weatherData.current.temperature,
        condition: weatherData.current.condition,
        timestamp: new Date().toISOString()
    };
    
    favorites.push(newFavorite);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    
    renderFavorites();
    closeFavoriteModal();
    showNotification(`${nickname} added to favorites`);
}

// Remove Favorite
function removeFavorite(id) {
    if (confirm('Remove from favorites?')) {
        favorites = favorites.filter(fav => fav.id !== id);
        localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        renderFavorites();
        showNotification('Location removed from favorites');
    }
}

// Open Favorite Modal
function openFavoriteModal() {
    document.getElementById('favoriteLocationName').textContent = weatherData.current.location;
    document.getElementById('favoriteModal').classList.add('active');
    document.getElementById('favoriteNickname').focus();
}

// Close Favorite Modal
function closeFavoriteModal() {
    document.getElementById('favoriteModal').classList.remove('active');
    document.getElementById('favoriteNickname').value = '';
}

// Show News Detail
function showNewsDetail(newsId) {
    // In real app, this would show detailed news
    alert(`News detail would open for article ${newsId}`);
}

// Get Current Location
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showNotification('Geolocation is not supported by your browser', 'error');
        return;
    }
    
    showLoadingScreen();
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            
            // In real app, reverse geocode to get location name
            // For demo, use coordinates
            const location = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
            
            // Update map
            if (map) {
                map.setView([latitude, longitude], 12);
                L.marker([latitude, longitude]).addTo(map)
                    .bindPopup('<b>Your Location</b>')
                    .openPopup();
            }
            
            // Update weather data
            weatherData.current.location = `Near ${location}`;
            await loadWeatherData();
            await loadAirQualityData();
            
            renderCurrentWeather();
            renderHourlyForecast();
            renderDailyForecast();
            renderAirQuality();
            
            hideLoadingScreen();
            showNotification('Location updated successfully');
        },
        (error) => {
            hideLoadingScreen();
            showNotification('Unable to retrieve your location', 'error');
            console.error('Geolocation error:', error);
        }
    );
}

// Toggle Unit
function toggleUnit(unit) {
    if (currentUnit === unit) return;
    
    currentUnit = unit;
    
    // Update active button
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.unit === unit);
    });
    
    // Re-render temperature data
    renderCurrentWeather();
    renderHourlyForecast();
    renderDailyForecast();
    renderFavorites();
    
    showNotification(`Switched to ${unit === 'metric' ? 'Celsius' : 'Fahrenheit'}`);
}

// Change Map Layer
function changeMapLayer(layer) {
    if (currentMapLayer === layer) return;
    
    currentMapLayer = layer;
    
    // Update active button
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.layer === layer);
    });
    
    // Update map
    updateMapLayer();
}

// Refresh Map
function refreshMap() {
    if (map) {
        // Just update the layer for demo
        updateMapLayer();
        showNotification('Weather map refreshed');
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#f56565'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Start Auto Update
function startAutoUpdate() {
    // Update time every minute
    setInterval(updateTime, 60000);
    
    // Refresh weather data every 15 minutes
    setInterval(async () => {
        await loadWeatherData();
        await loadAirQualityData();
        
        renderCurrentWeather();
        renderHourlyForecast();
        renderDailyForecast();
        renderAirQuality();
        
        updateTime();
        showNotification('Weather data updated', 'info');
    }, 900000); // 15 minutes
}

// Helper Functions
function celsiusToFahrenheit(c) {
    return (c * 9/5) + 32;
}

function kmhToMph(kmh) {
    return kmh * 0.621371;
}

function kmToMiles(km) {
    return (km * 0.621371).toFixed(1);
}

function formatTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
}

// Setup Event Listeners
function setupEventListeners() {
    // Search button
    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value.trim();
        if (query) {
            searchLocation(query);
            document.getElementById('searchInput').value = '';
        }
    });
    
    // Search input enter key
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.trim();
            if (query) {
                searchLocation(query);
                e.target.value = '';
            }
        }
    });
    
    // Location button
    document.getElementById('locationBtn').addEventListener('click', getCurrentLocation);
    
    // Unit toggle buttons
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleUnit(btn.dataset.unit));
    });
    
    // Time range buttons
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // In real app, this would load different hourly range
            const hours = parseInt(this.dataset.hours);
            showNotification(`Showing ${hours} hour forecast`);
        });
    });
    
    // Map layer buttons
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.addEventListener('click', () => changeMapLayer(btn.dataset.layer));
    });
    
    // Refresh map button
    document.getElementById('refreshMap').addEventListener('click', refreshMap);
    
    // Add favorite button
    document.getElementById('addFavoriteBtn').addEventListener('click', openFavoriteModal);
    
    // Clear history button
    document.getElementById('clearHistoryBtn').addEventListener('click', clearSearchHistory);
    
    // Close favorite modal
    document.getElementById('closeFavoriteModal').addEventListener('click', closeFavoriteModal);
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .notification button {
            background: transparent;
            border: none;
            color: white;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        
        .notification button:hover {
            opacity: 1;
        }
        
        .empty-favorites, .empty-history {
            text-align: center;
            padding: 40px 20px;
            color: var(--gray);
        }
        
        .empty-favorites i, .empty-history i {
            font-size: 3rem;
            color: var(--gray-light);
            margin-bottom: 15px;
        }
        
        .uv-extreme {
            color: #8f3f97 !important;
            font-weight: 700;
        }
        
        .uv-very-high {
            color: #ff0000 !important;
            font-weight: 700;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initWeatherApp);