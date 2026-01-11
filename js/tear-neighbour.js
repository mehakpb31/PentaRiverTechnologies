var tearData = [
    // --- Architecture (Expanded) ---
    {
        id: 'arch-1',
        title: 'Classic Warm White',
        desc: 'Elegant, timeless accent lighting for any architectural style.',
        category: 'Architecture',
        icon: 'fa-home',
        image: '../images/trimlight/TearNeighbour/240820 3141 WOODLAND PK CV S JORDAN UT-1.jpg',
        isFav: true
    },
    {
        id: 'arch-2',
        title: 'Estate Cool White',
        desc: 'Crisp, modern white lighting that highlights rooflines perfectly.',
        category: 'Architecture',
        icon: 'fa-building',
        image: '../images/trimlight/TearNeighbour/240820 3141 WOODLAND PK CV S JORDAN UT-2.jpg',
        isFav: false
    },
    {
        id: 'arch-3',
        title: 'Soft Gold Accent',
        desc: 'A subtle, low-kelvin gold hue for a cozy evening ambiance.',
        category: 'Architecture',
        icon: 'fa-lightbulb',
        image: '../images/trimlight/TearNeighbour/240820 3141 WOODLAND PK CV S JORDAN UT-3.jpg',
        isFav: false
    },
    {
        id: 'arch-4',
        title: 'Security Bright',
        desc: 'Maximum brightness spacing for safety and visibility.',
        category: 'Architecture',
        icon: 'fa-shield-alt',
        image: '../images/trimlight/TearNeighbour/240820 3141 WOODLAND PK CV S JORDAN UT-4.jpg',
        isFav: false
    },
    {
        id: 'arch-5',
        title: 'Modern Minimalist',
        desc: 'spaced out pattern for a subtle architectural touch.',
        category: 'Architecture',
        icon: 'fa-crop-alt',
        image: '../images/trimlight/TearNeighbour/240820 3141 WOODLAND PK CV S JORDAN UT-5.jpg',
        isFav: false
    },

    // --- Weekend ---
    {
        id: 'wknd-1',
        title: 'Friday Night Lights',
        desc: 'Vibrant purple and teal for a fun weekend vibe.',
        category: 'Weekend',
        icon: 'fa-glass-cheers',
        image: '../images/trimlight/TearNeighbour/240820 3141 WOODLAND PK CV S JORDAN UT-10.jpg',
        isFav: false
    },
    {
        id: 'wknd-2',
        title: 'Backyard BBQ',
        desc: 'Warm amber and soft white for hosting guests.',
        category: 'Weekend',
        icon: 'fa-utensils',
        image: '../images/trimlight/TearNeighbour/240820 3141 WOODLAND PK CV S JORDAN UT-11.jpg',
        isFav: false
    },

    // --- Holidays & Events ---
    {
        id: 'hol-1',
        title: 'Candy Cane Lane',
        desc: 'Red and white motion pattern perfect for Christmas.',
        category: 'Christmas',
        icon: 'fa-candy-cane',
        image: '../images/trimlight/TearNeighbour/240820 3141 WOODLAND PK CV S JORDAN UT-16.jpg',
        isFav: true
    },
    {
        id: 'hol-2',
        title: 'Champagne Sparkle',
        desc: 'Twinkling gold and white for New Year’s Eve.',
        category: 'New Year',
        icon: 'fa-glass-martini-alt',
        image: '../images/trimlight/TearNeighbour/240820 3141 WOODLAND PK CV S JORDAN UT-12.jpg',
        isFav: false
    },
    {
        id: 'hol-3',
        title: 'Dad‘s Royal Blue',
        desc: 'Bold blue lighting to celebrate Father’s Day.',
        category: 'Fathers Day',
        icon: 'fa-user-tie',
        image: '../images/trimlight/TearNeighbour/240820 3141 WOODLAND PK CV S JORDAN UT-14.jpg',
        isFav: false
    },
    {
        id: 'hol-4',
        title: 'Gameday Spirit',
        desc: 'Support your team with custom colors.',
        category: 'Sports',
        icon: 'fa-football-ball',
        image: '../images/trimlight/TearNeighbour/240820 3141 WOODLAND PK CV S JORDAN UT-15.jpg',
        isFav: false
    }
];

document.addEventListener('DOMContentLoaded', function () {
    initTearNeighbour();
});

function initTearNeighbour() {
    const tabsContainer = document.querySelector('.tear-tabs');
    const gridContainer = document.getElementById('tearGrid');
    const searchInput = document.getElementById('tearSearch');

    // Preview Elements
    const prevTitle = document.getElementById('tearPreviewTitle');
    const prevDesc = document.getElementById('tearPreviewDesc');
    const prevImg = document.getElementById('tearPreviewImg');
    const favBtn = document.getElementById('tearFavBtn');

    let activeCategory = 'Architecture'; // Default to architecture as requested
    let activePattern = tearData[0];

    // 1. Build Categories
    // Ensure Architecture is first
    const rawCats = [...new Set(tearData.map(d => d.category))];
    const categories = ['All', 'Architecture', ...rawCats.filter(c => c !== 'Architecture')];

    function renderTabs() {
        tabsContainer.innerHTML = '';
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `tear-tab ${cat === activeCategory ? 'is-active' : ''}`;
            btn.textContent = cat;
            btn.onclick = () => {
                activeCategory = cat;
                renderTabs();
                renderGrid();
            };
            tabsContainer.appendChild(btn);
        });
    }

    // 2. Render Grid
    function renderGrid() {
        gridContainer.innerHTML = '';
        const term = searchInput.value.toLowerCase();

        const filtered = tearData.filter(item => {
            const matchCat = activeCategory === 'All' || item.category === activeCategory;
            const matchSearch = item.title.toLowerCase().includes(term) || item.category.toLowerCase().includes(term);
            return matchCat && matchSearch;
        });

        if (filtered.length === 0) {
            gridContainer.innerHTML = '<div style="grid-column: 1/-1; padding: 20px; text-align:center; color:rgba(255,255,255,0.5);">No patterns found.</div>';
            return;
        }

        filtered.forEach(item => {
            const tile = document.createElement('div');
            tile.className = `tear-tile ${item.id === activePattern.id ? 'is-active' : ''}`;
            tile.innerHTML = `
                <div class="tear-tile-ic"><i class="fas ${item.icon}"></i></div>
                <div>
                    <div class="tear-tile-title">${item.title}</div>
                    <div class="tear-tile-sub">${item.category}</div>
                </div>
                <div class="tear-tile-go"><i class="fas fa-chevron-right"></i></div>
            `;
            tile.onclick = () => setPattern(item);
            gridContainer.appendChild(tile);
        });
    }

    // 3. Set Pattern (Update Preview)
    function setPattern(item) {
        activePattern = item;

        // Update Grid UI
        document.querySelectorAll('.tear-tile').forEach(el => el.classList.remove('is-active'));
        renderGrid(); // Re-render to highlight active likely

        // Update Preview Text
        prevTitle.textContent = item.title;
        prevDesc.textContent = item.desc;

        // Update Preview Image with fade
        prevImg.classList.remove('is-loaded');
        setTimeout(() => {
            prevImg.src = item.image;
            prevImg.onload = () => prevImg.classList.add('is-loaded');
        }, 200);

        // Update Fav Button
        if (item.isFav) favBtn.classList.add('is-active');
        else favBtn.classList.remove('is-active');
    }

    // 5. Fav Toggle
    favBtn.onclick = () => {
        activePattern.isFav = !activePattern.isFav;
        favBtn.classList.toggle('is-active');
    };

    // 6. Navigation Buttons
    document.getElementById('tearPrevBtn').onclick = () => {
        let idx = tearData.indexOf(activePattern);
        idx = idx > 0 ? idx - 1 : tearData.length - 1;
        setPattern(tearData[idx]);
    };

    document.getElementById('tearNextBtn').onclick = () => {
        let idx = tearData.indexOf(activePattern);
        idx = idx < tearData.length - 1 ? idx + 1 : 0;
        setPattern(tearData[idx]);
    };

    // Search Listener
    searchInput.addEventListener('input', renderGrid);

    // Initialize
    renderTabs();
    renderGrid();
    setPattern(activePattern);
}
