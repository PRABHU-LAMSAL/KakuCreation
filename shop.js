// Product Data (Packages removed - moved to packages.html)
const products = [
    {
        id: 1,
        name: 'Premium Photo Album',
        category: 'albums',
        description: 'Hardcover premium photo album with 50 pages',
        price: 8000,
        oldPrice: 10000,
        image: 'album'
    },
    {
        id: 2,
        name: 'Luxury Photo Album',
        category: 'albums',
        description: 'Luxury leather-bound photo album with 100 pages',
        price: 15000,
        oldPrice: 20000,
        image: 'album-luxury'
    },
    {
        id: 3,
        name: 'Canvas Print (Large)',
        category: 'prints',
        description: 'High-quality canvas print 24x36 inches',
        price: 3000,
        oldPrice: 4000,
        image: 'canvas'
    },
    {
        id: 4,
        name: 'Canvas Print (Medium)',
        category: 'prints',
        description: 'High-quality canvas print 16x24 inches',
        price: 2000,
        oldPrice: 2500,
        image: 'canvas'
    },
    {
        id: 5,
        name: 'Framed Print (Large)',
        category: 'prints',
        description: 'Premium framed print 20x30 inches',
        price: 2500,
        oldPrice: 3000,
        image: 'framed'
    },
    {
        id: 6,
        name: 'Digital Photo Package',
        category: 'digital',
        description: 'All edited photos in high resolution (USB drive included)',
        price: 5000,
        oldPrice: 7000,
        image: 'digital'
    },
    {
        id: 7,
        name: 'Video Highlights Package',
        category: 'digital',
        description: '5-minute cinematic wedding highlights video',
        price: 15000,
        oldPrice: 20000,
        image: 'video'
    },
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize Shop
function initShop() {
    displayProducts(products);
    updateCartCount();
    setupFilters();
    setupCartModal();
}

// Display Products
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;

    const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

    card.innerHTML = `
        <div class="product-image">
            <i class="fas fa-camera"></i>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category.toUpperCase()}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">
                ₹${product.price.toLocaleString('en-IN')}
                ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice.toLocaleString('en-IN')}</span>` : ''}
                ${discount > 0 ? `<span style="color: var(--primary-green); font-size: 0.9rem; margin-left: 0.5rem;">(${discount}% OFF)</span>` : ''}
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;

    return card;
}

// Filter Products
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter products
            const filter = btn.dataset.filter;
            let filteredProducts;

            if (filter === 'all') {
                filteredProducts = products;
            } else {
                filteredProducts = products.filter(p => p.category === filter);
            }

            displayProducts(filteredProducts);
        });
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification('Product added to cart!');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    displayCart();
    showNotification('Product removed from cart');
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartCount();
        displayCart();
    }
}

// Display Cart
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '₹0';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')} × ${item.quantity}</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <span class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </span>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
}

// Setup Cart Modal
function setupCartModal() {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeBtn = document.querySelector('.close');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cartBtn && cartModal) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            displayCart();
            cartModal.style.display = 'block';
        });
    }

    if (closeBtn && cartModal) {
        closeBtn.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Thank you for your order! Total: ₹${total.toLocaleString('en-IN')}\n\nWe will contact you soon to confirm your booking.`);
            
            // Clear cart
            cart = [];
            saveCart();
            updateCartCount();
            displayCart();
            document.getElementById('cartModal').style.display = 'none';
        });
    }

    // Close modal when clicking outside
    if (cartModal) {
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-green);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShop);
} else {
    initShop();
}

