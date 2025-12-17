// E-Commerce Platform - JavaScript

// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        subcategory: "headphones",
        price: 129.99,
        originalPrice: 199.99,
        rating: 4.5,
        reviewCount: 124,
        badge: "sale",
        tags: ["popular", "sale"],
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        features: ["Noise Cancellation", "30hr Battery", "Bluetooth 5.0", "Foldable Design"],
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        stock: 25,
        sold: 150
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        category: "electronics",
        subcategory: "wearables",
        price: 249.99,
        originalPrice: 299.99,
        rating: 4.8,
        reviewCount: 89,
        badge: "new",
        tags: ["new", "popular"],
        description: "Advanced smartwatch with health monitoring, GPS, and water resistance.",
        features: ["Heart Rate Monitor", "GPS", "Water Resistant", "7-day Battery"],
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1579586337278-3f7e8e5a6c34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        stock: 15,
        sold: 210
    },
    {
        id: 3,
        name: "Premium Leather Jacket",
        category: "fashion",
        subcategory: "jackets",
        price: 189.99,
        originalPrice: 0,
        rating: 4.3,
        reviewCount: 67,
        badge: "",
        tags: ["popular"],
        description: "Genuine leather jacket with modern design and comfortable fit.",
        features: ["100% Genuine Leather", "Inner Pocket", "Zipper Closure", "Adjustable Cuffs"],
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        stock: 10,
        sold: 45
    },
    {
        id: 4,
        name: "Ceramic Coffee Mug Set",
        category: "home",
        subcategory: "kitchen",
        price: 34.99,
        originalPrice: 49.99,
        rating: 4.7,
        reviewCount: 203,
        badge: "sale",
        tags: ["sale"],
        description: "Set of 4 premium ceramic mugs with unique designs and comfortable handle.",
        features: ["Set of 4", "Microwave Safe", "Dishwasher Safe", "Unique Designs"],
        images: [
            "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1577937927131-a4c6d4c7ec6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        stock: 50,
        sold: 320
    },
    {
        id: 5,
        name: "Fitness Tracker Band",
        category: "sports",
        subcategory: "fitness",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.2,
        reviewCount: 156,
        badge: "sale",
        tags: ["sale"],
        description: "Waterproof fitness tracker with heart rate monitoring and sleep tracking.",
        features: ["Heart Rate Monitor", "Sleep Tracking", "Waterproof", "14-day Battery"],
        images: [
            "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        stock: 30,
        sold: 180
    },
    {
        id: 6,
        name: "Yoga Mat Premium",
        category: "sports",
        subcategory: "yoga",
        price: 45.99,
        originalPrice: 0,
        rating: 4.6,
        reviewCount: 98,
        badge: "",
        tags: ["popular"],
        description: "Non-slip yoga mat with carrying strap and alignment lines.",
        features: ["Non-slip Surface", "Carrying Strap", "Alignment Lines", "Eco-friendly"],
        images: [
            "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1593164842264-854604db2260?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        stock: 40,
        sold: 120
    },
    {
        id: 7,
        name: "Organic Cotton T-Shirt",
        category: "fashion",
        subcategory: "shirts",
        price: 29.99,
        originalPrice: 39.99,
        rating: 4.4,
        reviewCount: 234,
        badge: "sale",
        tags: ["sale", "popular"],
        description: "Soft organic cotton t-shirt available in multiple colors.",
        features: ["100% Organic Cotton", "Multiple Colors", "Breathable", "Machine Washable"],
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        stock: 100,
        sold: 450
    },
    {
        id: 8,
        name: "Desk Lamp with Wireless Charger",
        category: "home",
        subcategory: "lighting",
        price: 59.99,
        originalPrice: 0,
        rating: 4.9,
        reviewCount: 78,
        badge: "new",
        tags: ["new"],
        description: "Modern desk lamp with built-in wireless charger and adjustable brightness.",
        features: ["Wireless Charger", "Adjustable Brightness", "Touch Controls", "USB Port"],
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1501147830916-ce44a6359892?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        stock: 20,
        sold: 65
    }
];

// Cart Data
let cart = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 129.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 249.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
];

// Wishlist Data
let wishlist = [1, 3, 6]; // Product IDs

// Current state
let currentFilter = 'all';
let currentSlide = 0;
let sliderInterval;

// Initialize E-commerce Platform
function initEcommerce() {
    loadFeaturedProducts();
    loadBestSellers();
    updateCartCount();
    updateWishlistCount();
    initHeroSlider();
    setupEventListeners();
    loadCartPreview();
    
    // Check URL parameters for product view
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    if (productId) {
        showProductDetails(parseInt(productId));
    }
}

// Load Featured Products
function loadFeaturedProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    let filteredProducts = [...products];
    
    // Apply filter
    if (currentFilter !== 'all') {
        filteredProducts = products.filter(product => 
            product.tags.includes(currentFilter)
        );
    }
    
    // Display products
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    
    const stars = getStarRating(product.rating);
    const discount = product.originalPrice ? 
        Math.round((1 - product.price / product.originalPrice) * 100) + '%' : '';
    
    card.innerHTML = `
        ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge.toUpperCase()}</span>` : ''}
        ${discount ? `<span class="product-badge sale" style="right: 15px; left: auto;">-${disciscount}</span>` : ''}
        
        <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="product-actions">
                <button class="action-btn" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                    <i class="far fa-heart"></i>
                </button>
                <button class="action-btn" onclick="quickView(${product.id})" title="Quick View">
                    <i class="far fa-eye"></i>
                </button>
                <button class="action-btn" onclick="addToCart(${product.id})" title="Add to Cart">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
        
        <div class="product-info">
            <span class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
            <h3 class="product-title">${product.name}</h3>
            
            <div class="product-price">
                <span class="current-price">$${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            
            <div class="product-rating">
                <div class="stars">${stars}</div>
                <span class="rating-count">(${product.reviewCount})</span>
            </div>
            
            <button class="btn-add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
    
    // Add click event for product details
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.product-actions') && !e.target.closest('.btn-add-to-cart')) {
            showProductDetails(product.id);
        }
    });
    
    return card;
}

// Get Star Rating HTML
function getStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Load Best Sellers
function loadBestSellers() {
    const carousel = document.getElementById('bestSellersCarousel');
    if (!carousel) return;
    
    carousel.innerHTML = '';
    
    // Sort by number sold
    const bestSellers = [...products]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5);
    
    bestSellers.forEach(product => {
        const productCard = createProductCard(product);
        carousel.appendChild(productCard);
    });
}

// Initialize Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slides.length) return;
    
    // Show first slide
    slides[0].classList.add('active');
    dots[0].classList.add('active');
    
    // Set up automatic sliding
    sliderInterval = setInterval(nextSlide, 5000);
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        clearInterval(sliderInterval);
        prevSlide();
        sliderInterval = setInterval(nextSlide, 5000);
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        clearInterval(sliderInterval);
        nextSlide();
        sliderInterval = setInterval(nextSlide, 5000);
    });
    
    // Dot controls
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(sliderInterval);
            goToSlide(index);
            sliderInterval = setInterval(nextSlide, 5000);
        });
    });
}

// Next Slide
function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Previous Slide
function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Go to Specific Slide
function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${product.name} quantity updated in cart`);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.images[0]
        });
        showNotification(`${product.name} added to cart`);
    }
    
    updateCartCount();
    loadCartPreview();
    
    // Update cart modal if open
    if (document.getElementById('cartModal').classList.contains('active')) {
        loadCartModal();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const product = cart[index];
        cart.splice(index, 1);
        showNotification(`${product.name} removed from cart`);
        updateCartCount();
        loadCartPreview();
        loadCartModal();
    }
}

// Update Cart Quantity
function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        updateCartCount();
        loadCartPreview();
        loadCartModal();
    } else if (item && newQuantity === 0) {
        removeFromCart(productId);
    }
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Update Wishlist Count
function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// Load Cart Preview
function loadCartPreview() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    
    if (!cartItems || !cartTotal) return;
    
    // Clear existing items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 20px; color: #718096;">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    // Add cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.quantity} × $${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-times"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Update total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${subtotal.toFixed(2)}`;
}

// Load Cart Modal
function loadCartModal() {
    const cartModalBody = document.getElementById('cartModalBody');
    if (!cartModalBody) return;
    
    cartModalBody.innerHTML = '';
    
    if (cart.length === 0) {
        cartModalBody.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started</p>
                <button class="btn-continue-shopping" onclick="closeCartModal()">Continue Shopping</button>
            </div>
        `;
        return;
    }
    
    // Create cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-modal-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="cart-item-subtotal">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-times"></i>
            </button>
        `;
        cartModalBody.appendChild(cartItem);
    });
    
    // Update summary
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const total = subtotal + shipping;
    
    document.querySelectorAll('.summary-value')[0].textContent = `$${subtotal.toFixed(2)}`;
    document.querySelectorAll('.summary-value')[2].textContent = `$${total.toFixed(2)}`;
}

// Add to Wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        wishlist.push(productId);
        showNotification(`${product.name} added to wishlist`);
    } else {
        wishlist.splice(index, 1);
        showNotification(`${product.name} removed from wishlist`);
    }
    
    updateWishlistCount();
}

// Quick View Product
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    
    if (!modal || !content) return;
    
    const stars = getStarRating(product.rating);
    
    content.innerHTML = `
        <div class="quick-view-header">
            <h2>${product.name}</h2>
            <button class="close-quick-view" onclick="closeQuickView()">&times;</button>
        </div>
        
        <div class="quick-view-body">
            <div class="product-gallery">
                <div class="main-image">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="thumbnail-images">
                    ${product.images.map((img, index) => `
                        <img src="${img}" alt="${product.name} ${index + 1}" 
                             onclick="changeMainImage('${img}')"
                             class="${index === 0 ? 'active' : ''}">
                    `).join('')}
                </div>
            </div>
            
            <div class="product-details">
                <div class="product-price-large">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? 
                        `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                         <span class="discount">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>` 
                        : ''}
                </div>
                
                <div class="product-rating-large">
                    ${stars}
                    <span>${product.rating} (${product.reviewCount} reviews)</span>
                </div>
                
                <div class="product-description">
                    <h3>Description</h3>
                    <p>${product.description}</p>
                </div>
                
                <div class="product-features">
                    <h3>Features</h3>
                    <ul>
                        ${product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="product-stock">
                    <span class="stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                        <i class="fas fa-${product.stock > 0 ? 'check-circle' : 'times-circle'}"></i>
                        ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                    <span class="sold-count">${product.sold} sold</span>
                </div>
                
                <div class="product-actions-large">
                    <div class="quantity-selector">
                        <button onclick="updateQuickViewQuantity(-1)">-</button>
                        <input type="number" id="quickViewQuantity" value="1" min="1" max="${product.stock}">
                        <button onclick="updateQuickViewQuantity(1)">+</button>
                    </div>
                    
                    <button class="btn-add-to-cart-large" onclick="addToCartFromQuickView(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    
                    <button class="btn-buy-now" onclick="buyNow(${product.id})">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Change Main Image in Quick View
function changeMainImage(src) {
    const mainImage = document.querySelector('.main-image img');
    if (mainImage) {
        mainImage.src = src;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail-images img').forEach(img => {
        img.classList.remove('active');
        if (img.src === src) {
            img.classList.add('active');
        }
    });
}

// Update Quick View Quantity
function updateQuickViewQuantity(change) {
    const input = document.getElementById('quickViewQuantity');
    if (!input) return;
    
    let quantity = parseInt(input.value) + change;
    const max = parseInt(input.max);
    
    if (quantity < 1) quantity = 1;
    if (quantity > max) quantity = max;
    
    input.value = quantity;
}

// Add to Cart from Quick View
function addToCartFromQuickView(productId) {
    const quantityInput = document.getElementById('quickViewQuantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.images[0]
        });
    }
    
    updateCartCount();
    loadCartPreview();
    closeQuickView();
    
    showNotification(`${quantity} × ${product.name} added to cart`);
}

// Buy Now
function buyNow(productId) {
    addToCartFromQuickView(productId);
    openCartModal();
}

// Close Quick View
function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show Product Details
function showProductDetails(productId) {
    // In a real app, this would redirect to product page
    // For demo, we'll open quick view
    quickView(productId);
}

// Open Cart Modal
function openCartModal() {
    const modal = document.getElementById('cartModal');
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.id = 'cartModalOverlay';
    overlay.onclick = closeCartModal;
    document.body.appendChild(overlay);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadCartModal();
}

// Close Cart Modal
function closeCartModal() {
    const modal = document.getElementById('cartModal');
    const overlay = document.getElementById('cartModalOverlay');
    
    modal.classList.remove('active');
    if (overlay) overlay.remove();
    document.body.style.overflow = 'auto';
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
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
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

// Setup Event Listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            loadFeaturedProducts();
        });
    });
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            showNotification(`Filtering ${category} products...`);
            // In real app, this would filter products by category
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    showNotification(`Searching for "${query}"...`);
                    // In real app, this would search products
                }
            }
        });
    }
    
    // Search button
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (searchInput) {
                const query = searchInput.value.trim();
                if (query) {
                    showNotification(`Searching for "${query}"...`);
                }
            }
        });
    }
    
    // User account
    const userAccount = document.getElementById('userAccount');
    if (userAccount) {
        userAccount.addEventListener('click', () => {
            showNotification('Login/Signup feature would open here');
        });
    }
    
    // Wishlist button
    const wishlistBtn = document.getElementById('wishlistBtn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            showNotification('Wishlist page would open here');
        });
    }
    
    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCartModal);
    }
    
    // Close cart modal
    const closeCartModalBtn = document.getElementById('closeCartModal');
    if (closeCartModalBtn) {
        closeCartModalBtn.addEventListener('click', closeCartModal);
    }
    
    // Continue shopping button
    const continueShoppingBtn = document.querySelector('.btn-continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', closeCartModal);
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.cart-modal-footer .btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            showNotification('Checkout process would start here');
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showNotification(`Thank you for subscribing with ${email}`);
                this.reset();
            }
        });
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.querySelector('.main-nav');
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
    
    // Add styles for notifications
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
        
        .quick-view-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }
        
        .product-gallery {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .main-image img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 8px;
        }
        
        .thumbnail-images {
            display: flex;
            gap: 10px;
        }
        
        .thumbnail-images img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 4px;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.3s;
        }
        
        .thumbnail-images img:hover,
        .thumbnail-images img.active {
            border-color: #667eea;
        }
        
        .product-price-large {
            display: flex;
            align-items: center;
            gap: 15px;
            margin: 20px 0;
        }
        
        .current-price {
            font-size: 2.5rem;
            font-weight: 700;
            color: #667eea;
        }
        
        .original-price {
            font-size: 1.5rem;
            color: #718096;
            text-decoration: line-through;
        }
        
        .discount {
            background: #f56565;
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-weight: 600;
        }
        
        .product-rating-large {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 20px 0;
            color: #fbbf24;
        }
        
        .product-features ul {
            list-style: none;
            padding: 0;
        }
        
        .product-features li {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .product-features li i {
            color: #48bb78;
        }
        
        .product-stock {
            display: flex;
            align-items: center;
            gap: 20px;
            margin: 20px 0;
            padding: 15px;
            background: #f7fafc;
            border-radius: 8px;
        }
        
        .stock-status.in-stock {
            color: #48bb78;
        }
        
        .stock-status.out-of-stock {
            color: #f56565;
        }
        
        .sold-count {
            color: #718096;
        }
        
        .product-actions-large {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }
        
        .quantity-selector {
            display: flex;
            align-items: center;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .quantity-selector button {
            width: 40px;
            height: 50px;
            background: #f7fafc;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .quantity-selector button:hover {
            background: #e2e8f0;
        }
        
        .quantity-selector input {
            width: 60px;
            height: 50px;
            border: none;
            text-align: center;
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .btn-add-to-cart-large,
        .btn-buy-now {
            flex: 1;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s;
        }
        
        .btn-add-to-cart-large {
            background: #667eea;
            color: white;
            border: none;
        }
        
        .btn-buy-now {
            background: #ed8936;
            color: white;
            border: none;
        }
        
        .btn-add-to-cart-large:hover,
        .btn-buy-now:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .quick-view-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .close-quick-view {
            background: none;
            border: none;
            font-size: 2rem;
            color: #718096;
            cursor: pointer;
            transition: color 0.3s;
        }
        
        .close-quick-view:hover {
            color: #f56565;
        }
        
        .empty-cart {
            text-align: center;
            padding: 40px 20px;
        }
        
        .empty-cart i {
            font-size: 4rem;
            color: #cbd5e0;
            margin-bottom: 20px;
        }
        
        .empty-cart h3 {
            margin-bottom: 10px;
            color: #2d3748;
        }
        
        .empty-cart p {
            color: #718096;
            margin-bottom: 20px;
        }
        
        .cart-modal-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .cart-modal-item img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
        }
        
        .cart-item-details {
            flex: 1;
        }
        
        .cart-item-details h4 {
            font-size: 1rem;
            margin-bottom: 5px;
        }
        
        .cart-item-price {
            color: #667eea;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .cart-item-quantity {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .cart-item-quantity button {
            width: 30px;
            height: 30px;
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .cart-item-subtotal {
            font-weight: 600;
            color: #2d3748;
        }
        
        .cart-item-remove {
            background: none;
            border: none;
            color: #f56565;
            cursor: pointer;
            font-size: 1.2rem;
        }
        
        @media (max-width: 768px) {
            .quick-view-body {
                grid-template-columns: 1fr;
            }
            
            .product-actions-large {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initEcommerce);