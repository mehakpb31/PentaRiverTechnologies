/**
 * Trimlight Kamloops Page Scripts
 */

document.addEventListener('DOMContentLoaded', function () {
    initHeroSlider();
    init3WaySlider();
    initInteractiveTechHub();
    initComparisonSlider();
});

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    if (slides.length === 0) return;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Auto advance slides
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Manual navigation via dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideTimer); // Stop auto-advance on manual interaction
            showSlide(index);
            slideTimer = setInterval(nextSlide, slideInterval); // Restart timer
        });
    });
}

function init3WaySlider() {
    const sliderControl = document.getElementById('trimlightSliderControl');
    const sliderHandle = document.getElementById('sliderHandle');
    const imageWhite = document.querySelector('.image-white');
    const imageRgb = document.querySelector('.image-rgb');

    if (!sliderControl || !imageWhite || !imageRgb) return;

    function updateSlider() {
        const value = parseInt(sliderControl.value);
        const max = parseInt(sliderControl.max);

        // Update Handle Position
        // value is 0-200. Percentage is value / 200 * 100
        const percentage = (value / max) * 100;
        if (sliderHandle) {
            sliderHandle.style.left = percentage + '%';
        }

        // Calculate opacity for White image (0 to 100)
        // 0 -> 0, 100 -> 1
        let whiteOpacity = 0;
        if (value <= 100) {
            whiteOpacity = value / 100;
        } else {
            whiteOpacity = 1; // Stay fully visible as RGB fades in on top
        }

        // Calculate opacity for RGB image (100 to 200)
        // 100 -> 0, 200 -> 1
        let rgbOpacity = 0;
        if (value > 100) {
            rgbOpacity = (value - 100) / 100;
        }

        imageWhite.style.opacity = whiteOpacity;
        imageRgb.style.opacity = rgbOpacity;
    }

    sliderControl.addEventListener('input', updateSlider);

    // Initialize
    updateSlider();
}

function initInteractiveTechHub() {
    const hotspots = document.querySelectorAll('.hotspot');
    const specCards = document.querySelectorAll('.glass-spec-card');

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseenter', () => activateCard(hotspot.dataset.target));
        hotspot.addEventListener('click', () => activateCard(hotspot.dataset.target));
    });

    function activateCard(targetId) {
        // Remove active class from all cards
        specCards.forEach(card => {
            card.classList.remove('active');
            card.style.display = 'none'; // Hide others
        });

        // Show and activate target card
        const targetCard = document.getElementById(targetId);
        if (targetCard) {
            targetCard.style.display = 'block';
            // Slight delay to allow display:block to apply before adding class for transition
            setTimeout(() => {
                targetCard.classList.add('active');
            }, 10);
        }
    }
}

function initComparisonSlider() {
    const container = document.querySelector('.comparison-slider-container');
    const beforeImage = document.querySelector('.comparison-image-wrapper.before');
    const handle = document.querySelector('.comparison-handle');

    if (!container || !beforeImage || !handle) return;

    let isDragging = false;

    const onMove = (e) => {
        if (!isDragging) return;

        const containerRect = container.getBoundingClientRect();
        let x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;

        // Calculate position relative to container
        let position = x - containerRect.left;

        // Clamp position
        if (position < 0) position = 0;
        if (position > containerRect.width) position = containerRect.width;

        // Update width of before image and handle position
        let percentage = (position / containerRect.width) * 100;

        beforeImage.style.width = percentage + '%';
        handle.style.left = percentage + '%';
    };

    const onStart = () => { isDragging = true; };
    const onEnd = () => { isDragging = false; };

    // Mouse events
    handle.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);

    // Touch events
    handle.addEventListener('touchstart', onStart);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
}
