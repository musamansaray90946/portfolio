// Crypto Dashboard - JavaScript
let priceChart;
let portfolioChart;
let currentCrypto = 'bitcoin';
let currentView = 'market_cap';
let cryptoData = [];
let newsData = [];
let watchlistData = [];

// Crypto Data (Simulated - In real app, use CoinGecko API)
const cryptoCurrencies = [
    {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        rank: 1,
        price: 64823.45,
        change24h: 2.45,
        marketCap: 1274500000000,
        volume24h: 32450000000,
        icon: 'fab fa-bitcoin',
        color: '#f7931a'
    },
    {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        rank: 2,
        price: 3412.67,
        change24h: 3.21,
        marketCap: 410280000000,
        volume24h: 15420000000,
        icon: 'fab fa-ethereum',
        color: '#627eea'
    },
    {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        rank: 3,
        price: 2.45,
        change24h: -1.23,
        marketCap: 78500000000,
        volume24h: 2450000000,
        icon: 'fas fa-coins',
        color: '#0033ad'
    },
    {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        rank: 4,
        price: 142.56,
        change24h: 5.67,
        marketCap: 62450000000,
        volume24h: 3245000000,
        icon: 'fas fa-sun',
        color: '#dc1fff'
    },
    {
        id: 'ripple',
        name: 'Ripple',
        symbol: 'XRP',
        rank: 5,
        price: 0.82,
        change24h: 0.89,
        marketCap: 44500000000,
        volume24h: 2450000000,
        icon: 'fas fa-bolt',
        color: '#23292f'
    },
    {
        id: 'polkadot',
        name: 'Polkadot',
        symbol: 'DOT',
        rank: 6,
        price: 28.34,
        change24h: -0.45,
        marketCap: 32450000000,
        volume24h: 1245000000,
        icon: 'fas fa-circle',
        color: '#e6007a'
    },
    {
        id: 'dogecoin',
        name: 'Dogecoin',
        symbol: 'DOGE',
        rank: 7,
        price: 0.18,
        change24h: 12.34,
        marketCap: 24500000000,
        volume24h: 3245000000,
        icon: 'fas fa-dog',
        color: '#c2a633'
    },
    {
        id: 'chainlink',
        name: 'Chainlink',
        symbol: 'LINK',
        rank: 8,
        price: 24.56,
        change24h: 1.23,
        marketCap: 12450000000,
        volume24h: 845000000,
        icon: 'fas fa-link',
        color: '#2a5ada'
    }
];

// News Data
const cryptoNews = [
    {
        id: 1,
        title: "Bitcoin ETF Approval Expected This Quarter",
        source: "CoinDesk",
        time: "2 hours ago",
        category: "Regulation"
    },
    {
        id: 2,
        title: "Ethereum Shanghai Upgrade Completed Successfully",
        source: "CryptoSlate",
        time: "5 hours ago",
        category: "Technology"
    },
    {
        id: 3,
        title: "Major Bank Announces Crypto Custody Services",
        source: "Bloomberg",
        time: "1 day ago",
        category: "Institutional"
    },
    {
        id: 4,
        title: "Solana Network Sees Record Activity Growth",
        source: "The Block",
        time: "2 days ago",
        category: "Adoption"
    }
];

// Initialize Dashboard
function initDashboard() {
    cryptoData = [...cryptoCurrencies];
    newsData = [...cryptoNews];
    
    // Load initial data
    loadCryptoTable();
    loadNewsFeed();
    loadWatchlist();
    initPortfolioChart();
    initPriceChart();
    updateMarketOverview();
    setupEventListeners();
    updateLastUpdateTime();
    
    // Start auto-update
    setInterval(updateCryptoPrices, 30000); // Update every 30 seconds
    setInterval(updateLastUpdateTime, 1000);
}

// Format Currency
function formatCurrency(amount) {
    if (amount >= 1000000000) {
        return '$' + (amount / 1000000000).toFixed(2) + 'B';
    } else if (amount >= 1000000) {
        return '$' + (amount / 1000000).toFixed(2) + 'M';
    } else if (amount >= 1000) {
        return '$' + (amount / 1000).toFixed(2) + 'K';
    } else {
        return '$' + amount.toFixed(2);
    }
}

// Load Crypto Table
function loadCryptoTable() {
    const tableBody = document.getElementById('cryptoTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Sort based on current view
    let sortedData = [...cryptoData];
    switch(currentView) {
        case 'market_cap':
            sortedData.sort((a, b) => b.marketCap - a.marketCap);
            break;
        case 'volume':
            sortedData.sort((a, b) => b.volume24h - a.volume24h);
            break;
        case 'gainers':
            sortedData.sort((a, b) => b.change24h - a.change24h);
            break;
    }
    
    sortedData.forEach(crypto => {
        const row = document.createElement('tr');
        const changeClass = crypto.change24h >= 0 ? 'positive' : 'negative';
        const changeSign = crypto.change24h >= 0 ? '+' : '';
        
        row.innerHTML = `
            <td class="crypto-rank">${crypto.rank}</td>
            <td>
                <div class="crypto-info">
                    <div class="crypto-icon" style="background: ${crypto.color}40; color: ${crypto.color}">
                        <i class="${crypto.icon}"></i>
                    </div>
                    <div class="crypto-details">
                        <div class="crypto-name">${crypto.name}</div>
                        <div class="crypto-symbol">${crypto.symbol}</div>
                    </div>
                </div>
            </td>
            <td class="crypto-price">$${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>
                <span class="crypto-change ${changeClass}">${changeSign}${crypto.change24h.toFixed(2)}%</span>
            </td>
            <td class="crypto-marketcap">${formatCurrency(crypto.marketCap)}</td>
            <td>
                <div class="crypto-action">
                    <button class="btn-trade-small" onclick="quickTrade('${crypto.id}')">
                        <i class="fas fa-exchange-alt"></i> Trade
                    </button>
                    <button class="btn-trade-small" onclick="addToWatchlist('${crypto.id}')">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Load News Feed
function loadNewsFeed() {
    const newsFeed = document.getElementById('newsFeed');
    if (!newsFeed) return;
    
    newsFeed.innerHTML = '';
    
    newsData.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.onclick = () => showNewsDetail(news.id);
        
        // Generate random image based on category
        const imageUrl = `https://source.unsplash.com/random/300x200/?${news.category},crypto,blockchain&sig=${news.id}`;
        
        newsItem.innerHTML = `
            <img src="${imageUrl}" alt="${news.title}" class="news-image">
            <div class="news-content">
                <div class="news-title">${news.title}</div>
                <div class="news-source">
                    <i class="fas fa-newspaper"></i> ${news.source} • ${news.category}
                </div>
                <div class="news-time">
                    <i class="far fa-clock"></i> ${news.time}
                </div>
            </div>
        `;
        
        newsFeed.appendChild(newsItem);
    });
}

// Load Watchlist
function loadWatchlist() {
    const watchlistItems = document.getElementById('watchlistItems');
    if (!watchlistItems) return;
    
    watchlistData = cryptoData.slice(0, 4); // First 4 as watchlist
    watchlistItems.innerHTML = '';
    
    watchlistData.forEach((crypto, index) => {
        const watchlistItem = document.createElement('div');
        watchlistItem.className = `watchlist-item ${index === 0 ? 'active' : ''}`;
        watchlistItem.onclick = () => selectCryptoChart(crypto.id);
        
        const changeClass = crypto.change24h >= 0 ? 'positive' : 'negative';
        const changeSign = crypto.change24h >= 0 ? '+' : '';
        
        watchlistItem.innerHTML = `
            <div class="watchlist-crypto">
                <div class="watchlist-icon ${crypto.symbol.toLowerCase()}">
                    <i class="${crypto.icon}"></i>
                </div>
                <div class="watchlist-info">
                    <div class="watchlist-name">${crypto.name}</div>
                    <div class="watchlist-symbol">${crypto.symbol}</div>
                </div>
            </div>
            <div class="watchlist-price">
                <div class="watchlist-price-value">$${crypto.price.toFixed(2)}</div>
                <div class="watchlist-price-change ${changeClass}">${changeSign}${crypto.change24h.toFixed(2)}%</div>
            </div>
        `;
        
        watchlistItems.appendChild(watchlistItem);
    });
}

// Initialize Portfolio Chart
function initPortfolioChart() {
    const ctx = document.getElementById('portfolioChart').getContext('2d');
    
    if (portfolioChart) {
        portfolioChart.destroy();
    }
    
    portfolioChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Bitcoin', 'Ethereum', 'Cardano', 'Others'],
            datasets: [{
                data: [15250.30, 6430.75, 2150.40, 1599.05],
                backgroundColor: [
                    '#f7931a',
                    '#627eea',
                    '#0033ad',
                    '#667eea'
                ],
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': $';
                            }
                            label += context.parsed.toLocaleString('en-US', { minimumFractionDigits: 2 });
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// Initialize Price Chart
function initPriceChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    if (priceChart) {
        priceChart.destroy();
    }
    
    // Generate price data for the last 30 days
    const currentCryptoData = cryptoData.find(c => c.id === currentCrypto);
    const basePrice = currentCryptoData.price;
    const prices = [];
    const labels = [];
    
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        // Generate realistic price movement
        let price = basePrice;
        if (i < 30) {
            const prevPrice = prices[prices.length - 1];
            const change = (Math.random() - 0.5) * 0.08 * prevPrice;
            price = prevPrice + change;
        }
        prices.push(price);
    }
    
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price',
                data: prices,
                borderColor: currentCryptoData.color,
                backgroundColor: currentCryptoData.color + '20',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        maxTicksLimit: 8
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        callback: function(value) {
                            return '$' + value.toLocaleString('en-US');
                        }
                    }
                }
            }
        }
    });
    
    // Update chart info
    updateChartInfo(currentCryptoData);
}

// Update Chart Information
function updateChartInfo(crypto) {
    document.getElementById('currentPrice').textContent = 
        `$${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    
    const changeElement = document.getElementById('priceChange');
    changeElement.textContent = `${crypto.change24h >= 0 ? '+' : ''}${crypto.change24h.toFixed(2)}%`;
    changeElement.className = `price-change ${crypto.change24h >= 0 ? 'positive' : 'negative'}`;
    
    document.getElementById('dayHigh').textContent = 
        `$${(crypto.price * 1.01).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    
    document.getElementById('dayLow').textContent = 
        `$${(crypto.price * 0.99).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    
    document.getElementById('chartVolume').textContent = formatCurrency(crypto.volume24h);
}

// Update Market Overview
function updateMarketOverview() {
    const totalMarketCap = cryptoData.reduce((sum, crypto) => sum + crypto.marketCap, 0);
    const dailyVolume = cryptoData.reduce((sum, crypto) => sum + crypto.volume24h, 0);
    const btcDominance = (cryptoData[0].marketCap / totalMarketCap * 100).toFixed(1);
    
    document.getElementById('totalMarketCap').textContent = formatCurrency(totalMarketCap);
    document.getElementById('dailyVolume').textContent = formatCurrency(dailyVolume);
    document.getElementById('btcDominance').textContent = `${btcDominance}%`;
    
    // Update change percentages
    const marketCapChange = (Math.random() * 5 - 1).toFixed(2);
    const volumeChange = (Math.random() * 8 - 2).toFixed(2);
    const dominanceChange = (Math.random() * 1 - 0.5).toFixed(2);
    
    document.querySelectorAll('.stat-change')[0].textContent = `${marketCapChange >= 0 ? '+' : ''}${marketCapChange}%`;
    document.querySelectorAll('.stat-change')[0].className = `stat-change ${marketCapChange >= 0 ? 'positive' : 'negative'}`;
    
    document.querySelectorAll('.stat-change')[1].textContent = `${volumeChange >= 0 ? '+' : ''}${volumeChange}%`;
    document.querySelectorAll('.stat-change')[1].className = `stat-change ${volumeChange >= 0 ? 'positive' : 'negative'}`;
    
    document.querySelectorAll('.stat-change')[2].textContent = `${dominanceChange >= 0 ? '+' : ''}${dominanceChange}%`;
    document.querySelectorAll('.stat-change')[2].className = `stat-change ${dominanceChange >= 0 ? 'positive' : 'negative'}`;
}

// Update Crypto Prices (Simulated)
function updateCryptoPrices() {
    cryptoData.forEach(crypto => {
        // Simulate price change
        const changePercent = (Math.random() - 0.5) * 0.1; // -5% to +5%
        crypto.price += crypto.price * changePercent;
        crypto.change24h = changePercent * 100;
        
        // Update market cap and volume proportionally
        crypto.marketCap += crypto.marketCap * changePercent;
        crypto.volume24h += crypto.volume24h * (Math.random() * 0.2 - 0.1);
        
        // Ensure price doesn't go below 0
        crypto.price = Math.max(crypto.price, 0.01);
        crypto.marketCap = Math.max(crypto.marketCap, 1000000);
        crypto.volume24h = Math.max(crypto.volume24h, 100000);
    });
    
    // Re-sort based on market cap
    cryptoData.sort((a, b) => b.marketCap - a.marketCap);
    cryptoData.forEach((crypto, index) => {
        crypto.rank = index + 1;
    });
    
    // Update UI
    loadCryptoTable();
    loadWatchlist();
    updateMarketOverview();
    
    // Update current crypto if it's selected
    const currentCryptoData = cryptoData.find(c => c.id === currentCrypto);
    if (currentCryptoData) {
        updateChartInfo(currentCryptoData);
        updatePriceChart();
    }
}

// Update Price Chart Data
function updatePriceChart() {
    if (!priceChart) return;
    
    const currentCryptoData = cryptoData.find(c => c.id === currentCrypto);
    const latestPrice = currentCryptoData.price;
    
    // Add new data point and remove oldest
    const data = priceChart.data.datasets[0].data;
    const labels = priceChart.data.labels;
    
    data.push(latestPrice);
    data.shift();
    
    // Update last label
    const now = new Date();
    labels.push(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    labels.shift();
    
    priceChart.update('none');
}

// Select Crypto Chart
function selectCryptoChart(cryptoId) {
    currentCrypto = cryptoId;
    
    // Update active state in watchlist
    document.querySelectorAll('.watchlist-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Update active state in chart buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const chartBtn = document.querySelector(`.chart-btn[data-chart="${cryptoId}"]`);
    if (chartBtn) {
        chartBtn.classList.add('active');
    }
    
    // Re-initialize chart
    initPriceChart();
}

// Quick Trade Function
function quickTrade(cryptoId) {
    const crypto = cryptoData.find(c => c.id === cryptoId);
    if (!crypto) return;
    
    // Set trade crypto
    document.getElementById('tradeCrypto').value = cryptoId;
    
    // Update quantity display
    updateTradeQuantity();
    
    // Scroll to trading panel
    document.querySelector('.trading-panel').scrollIntoView({ behavior: 'smooth' });
    
    // Show notification
    showNotification(`Ready to trade ${crypto.name} (${crypto.symbol})`);
}

// Add to Watchlist
function addToWatchlist(cryptoId) {
    const crypto = cryptoData.find(c => c.id === cryptoId);
    if (!crypto) return;
    
    // Check if already in watchlist
    const exists = watchlistData.find(c => c.id === cryptoId);
    if (exists) {
        showNotification(`${crypto.name} is already in your watchlist`);
        return;
    }
    
    // Add to watchlist
    watchlistData.push(crypto);
    loadWatchlist();
    
    showNotification(`${crypto.name} added to watchlist`);
}

// Update Trade Quantity
function updateTradeQuantity() {
    const cryptoSelect = document.getElementById('tradeCrypto');
    const amountInput = document.getElementById('tradeAmount');
    const quantityInput = document.getElementById('tradeQuantity');
    const quantityUnit = document.getElementById('quantityUnit');
    
    const crypto = cryptoData.find(c => c.id === cryptoSelect.value);
    if (!crypto) return;
    
    const amount = parseFloat(amountInput.value) || 100;
    const quantity = amount / crypto.price;
    
    quantityInput.value = quantity.toFixed(6);
    quantityUnit.textContent = crypto.symbol;
    
    // Update trade summary
    updateTradeSummary(amount, quantity);
}

// Update Trade Summary
function updateTradeSummary(amount, quantity) {
    const fees = amount * 0.001; // 0.1% fee
    const total = amount + fees;
    
    document.getElementById('estimatedCost').textContent = `$${amount.toFixed(2)}`;
    document.getElementById('tradeFees').textContent = `$${fees.toFixed(2)}`;
    document.getElementById('tradeTotal').textContent = `$${total.toFixed(2)}`;
}

// Execute Trade
function executeTrade() {
    const cryptoSelect = document.getElementById('tradeCrypto');
    const amountInput = document.getElementById('tradeAmount');
    const modeBtn = document.querySelector('.mode-btn.active');
    
    const crypto = cryptoData.find(c => c.id === cryptoSelect.value);
    const amount = parseFloat(amountInput.value);
    const mode = modeBtn.dataset.mode;
    
    if (!amount || amount < 10) {
        showNotification('Minimum trade amount is $10', 'error');
        return;
    }
    
    const quantity = amount / crypto.price;
    const fees = amount * 0.001;
    const total = amount + fees;
    
    // Show confirmation
    const action = mode === 'buy' ? 'Buy' : 'Sell';
    const confirmMsg = `${action} ${quantity.toFixed(6)} ${crypto.symbol} for $${total.toFixed(2)}?`;
    
    if (confirm(confirmMsg)) {
        // Simulate trade execution
        showNotification(`Trade executed successfully! ${action} order placed for ${crypto.symbol}`, 'success');
        
        // Reset form
        amountInput.value = '100';
        updateTradeQuantity();
        
        // Update portfolio (in a real app, this would update backend)
        updatePortfolioAfterTrade(crypto, quantity, mode, total);
    }
}

// Update Portfolio After Trade
function updatePortfolioAfterTrade(crypto, quantity, mode, total) {
    // In a real app, this would update the backend
    // For demo, just show a notification about portfolio update
    setTimeout(() => {
        showNotification(`Portfolio updated with ${mode} of ${crypto.symbol}`);
    }, 1000);
}

// Show News Detail
function showNewsDetail(newsId) {
    const news = newsData.find(n => n.id === newsId);
    if (!news) return;
    
    // In a real app, this would open a detailed news view
    alert(`News Detail:\n\n${news.title}\n\nSource: ${news.source}\nCategory: ${news.category}\n\nThis would typically open a full article view with detailed content.`);
}

// Show Notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
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
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
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

// Update Last Update Time
function updateLastUpdateTime() {
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (!lastUpdateElement) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    lastUpdateElement.textContent = `Last update: ${timeString}`;
}

// Setup Event Listeners
function setupEventListeners() {
    // Time filter buttons
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would update chart time range
            showNotification(`Time range set to ${this.textContent}`);
        });
    });
    
    // View options
    document.querySelectorAll('.view-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.view-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            currentView = this.dataset.view;
            loadCryptoTable();
        });
    });
    
    // Chart buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectCryptoChart(this.dataset.chart);
        });
    });
    
    // Trading mode
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const tradeBtn = document.getElementById('executeTrade');
            if (this.dataset.mode === 'buy') {
                tradeBtn.innerHTML = '<i class="fas fa-check"></i> Buy Now';
                tradeBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            } else {
                tradeBtn.innerHTML = '<i class="fas fa-check"></i> Sell Now';
                tradeBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            }
        });
    });
    
    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', function() {
        this.classList.add('refreshing');
        updateCryptoPrices();
        
        setTimeout(() => {
            this.classList.remove('refreshing');
            showNotification('Prices refreshed successfully', 'success');
        }, 1000);
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchCrypto');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            if (searchTerm.length >= 2) {
                const filtered = cryptoData.filter(crypto => 
                    crypto.name.toLowerCase().includes(searchTerm) || 
                    crypto.symbol.toLowerCase().includes(searchTerm)
                );
                
                // Update table with filtered results
                const tableBody = document.getElementById('cryptoTableBody');
                if (tableBody && filtered.length > 0) {
                    // Temporarily show filtered results
                    const originalData = [...cryptoData];
                    cryptoData = filtered;
                    loadCryptoTable();
                    cryptoData = originalData;
                }
            } else if (searchTerm.length === 0) {
                // Restore full table
                loadCryptoTable();
            }
        });
    }
    
    // Trade amount input
    const tradeAmount = document.getElementById('tradeAmount');
    if (tradeAmount) {
        tradeAmount.addEventListener('input', updateTradeQuantity);
    }
    
    // Trade crypto select
    const tradeCrypto = document.getElementById('tradeCrypto');
    if (tradeCrypto) {
        tradeCrypto.addEventListener('change', updateTradeQuantity);
    }
    
    // Execute trade button
    const executeTradeBtn = document.getElementById('executeTrade');
    if (executeTradeBtn) {
        executeTradeBtn.addEventListener('click', executeTrade);
    }
    
    // Add crypto button
    const addCryptoBtn = document.querySelector('.btn-add-crypto');
    if (addCryptoBtn) {
        addCryptoBtn.addEventListener('click', function() {
            const cryptoName = prompt('Enter cryptocurrency name or symbol:');
            if (cryptoName) {
                showNotification(`Searching for ${cryptoName}...`);
                // In a real app, this would search the API
            }
        });
    }
    
    // Add CSS for refreshing animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .btn-refresh.refreshing i {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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
    `;
    document.head.appendChild(style);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initDashboard);