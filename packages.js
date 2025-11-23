// Packages Data
const packages = [
    {
        id: 1,
        name: 'Wedding Photography Package',
        description: 'Complete wedding day coverage with 500+ edited photos, 2 photographers, 8 hours coverage, online gallery, and USB drive',
        price: 50000,
        oldPrice: 65000,
        features: [
            '2 Professional Photographers',
            '8 Hours Coverage',
            '500+ Edited Photos',
            'Online Gallery Access',
            'USB Drive with All Photos',
            'Pre-wedding Consultation',
            'Same Day Highlights'
        ],
        image: 'wedding'
    },
    {
        id: 2,
        name: 'Pre-Wedding Shoot',
        description: 'Romantic pre-wedding photography session at location of choice with professional editing',
        price: 25000,
        oldPrice: 30000,
        features: [
            '1 Professional Photographer',
            '4 Hours Session',
            '100+ Edited Photos',
            '2 Location Shoots',
            'Online Gallery',
            'USB Drive Included',
            'Outfit Changes Allowed'
        ],
        image: 'prewedding'
    },
    {
        id: 3,
        name: 'Engagement Photography',
        description: 'Beautiful engagement ceremony coverage with professional photography',
        price: 15000,
        oldPrice: 20000,
        features: [
            '1 Professional Photographer',
            '3 Hours Coverage',
            '80+ Edited Photos',
            'Online Gallery',
            'USB Drive',
            'Quick Turnaround'
        ],
        image: 'engagement'
    },
    {
        id: 4,
        name: 'Mehendi Ceremony Package',
        description: 'Complete mehendi ceremony photography and videography coverage',
        price: 20000,
        oldPrice: 25000,
        features: [
            '1 Photographer + 1 Videographer',
            '4 Hours Coverage',
            '100+ Edited Photos',
            '5-Minute Highlight Video',
            'Online Gallery',
            'USB Drive'
        ],
        image: 'mehendi'
    },
    {
        id: 5,
        name: 'Maternity Photography Session',
        description: 'Beautiful maternity photoshoot with professional editing and multiple poses',
        price: 12000,
        oldPrice: 15000,
        features: [
            '1 Professional Photographer',
            '2 Hours Session',
            '50+ Edited Photos',
            'Studio or Outdoor',
            'Online Gallery',
            'USB Drive',
            'Family Members Welcome'
        ],
        image: 'maternity'
    },
    {
        id: 6,
        name: 'Music Video Production',
        description: 'Professional music video production and editing with cinematic quality',
        price: 40000,
        oldPrice: 50000,
        features: [
            'Professional Director',
            'Full Day Shoot',
            '4K Video Quality',
            'Color Grading',
            'Multiple Camera Angles',
            'Audio Sync',
            'Final Edited Video'
        ],
        image: 'music-video'
    },
    {
        id: 7,
        name: 'Advertisement Video',
        description: 'Commercial advertisement video production for businesses and brands',
        price: 45000,
        oldPrice: 60000,
        features: [
            'Professional Production Team',
            'Script Development',
            '4K Video Quality',
            'Professional Editing',
            'Color Grading',
            'Motion Graphics',
            'Multiple Revisions'
        ],
        image: 'advertisement'
    },
    {
        id: 8,
        name: 'Full Wedding Video',
        description: 'Complete wedding video with multiple camera angles and cinematic editing',
        price: 35000,
        oldPrice: 45000,
        features: [
            '2 Videographers',
            'Full Day Coverage',
            '4K Video Quality',
            'Cinematic Editing',
            '5-Minute Highlights',
            'Full Ceremony Video',
            'USB Drive Included'
        ],
        image: 'video-full'
    }
];

// Initialize Packages
function initPackages() {
    displayPackages(packages);
}

// Display Packages
function displayPackages(packagesToShow) {
    const packagesGrid = document.getElementById('packagesGrid');
    if (!packagesGrid) return;

    packagesGrid.innerHTML = '';

    packagesToShow.forEach(package => {
        const packageCard = createPackageCard(package);
        packagesGrid.appendChild(packageCard);
    });
}

// Create Package Card
function createPackageCard(pkg) {
    const card = document.createElement('div');
    card.className = 'package-card';

    const discount = Math.round(((pkg.oldPrice - pkg.price) / pkg.oldPrice) * 100);

    card.innerHTML = `
        <div class="package-image">
            <i class="fas fa-camera"></i>
        </div>
        <div class="package-info">
            <div class="package-name">${pkg.name}</div>
            <div class="package-description">${pkg.description}</div>
            <div class="package-features">
                <h4>What's Included:</h4>
                <ul>
                    ${pkg.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="package-price">
                ₹${pkg.price.toLocaleString('en-IN')}
                ${pkg.oldPrice ? `<span class="old-price">₹${pkg.oldPrice.toLocaleString('en-IN')}</span>` : ''}
                ${discount > 0 ? `<span class="discount-tag">${discount}% OFF</span>` : ''}
            </div>
            <button class="btn btn-primary" onclick="inquirePackage(${pkg.id})">
                <i class="fas fa-envelope"></i> Inquire Now
            </button>
        </div>
    `;

    return card;
}

// Inquire Package
function inquirePackage(packageId) {
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;

    // You can replace this with a form modal or redirect to contact page
    const message = `I'm interested in the ${pkg.name} package (₹${pkg.price.toLocaleString('en-IN')}). Please contact me for more details.`;
    window.location.href = `index.html#contact?package=${encodeURIComponent(pkg.name)}&message=${encodeURIComponent(message)}`;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPackages);
} else {
    initPackages();
}


