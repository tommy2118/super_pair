// Navigation configuration
const slides = [
    { id: 1, file: 'index.html', title: 'Introduction' },
    { id: 2, file: 'slides/tools.html', title: 'Tools' },
    { id: 3, file: 'slides/foundation.html', title: 'The Foundation' },
    { id: 4, file: 'slides/context.html', title: 'Context Building' },
    { id: 5, file: 'slides/project.html', title: 'Project Context' },
    { id: 6, file: 'slides/technical.html', title: 'Technical Context' },
    { id: 7, file: 'slides/maintaining.html', title: 'Maintaining Context' },
    { id: 8, file: 'slides/pitfalls.html', title: 'Common Pitfalls' },
    { id: 9, file: 'slides/conclusion.html', title: 'Conclusion' }
];

// Get current slide number from URL or filename
function getCurrentSlideNumber() {
    const path = window.location.pathname;
    const currentFile = path.split('/').pop();
    const currentSlide = slides.find(slide => slide.file.endsWith(currentFile));
    return currentSlide ? currentSlide.id : 1;
}

// Navigation handlers
function navigateToSlide(direction) {
    const currentSlide = getCurrentSlideNumber();
    let nextSlideNum = currentSlide + direction;

    // Handle wraparound
    if (nextSlideNum > slides.length) nextSlideNum = 1;
    if (nextSlideNum < 1) nextSlideNum = slides.length;

    const nextSlide = slides.find(slide => slide.id === nextSlideNum);
    if (nextSlide) {
        // Add transition class before navigation
        document.body.classList.add('page-transition');

        // Determine if we need to go up a directory
        const isInSlidesDirectory = window.location.pathname.includes('/slides/');
        const prefix = isInSlidesDirectory ? '../' : '';

        setTimeout(() => {
            window.location.href = prefix + nextSlide.file;
        }, 300);
    }
}

// Update progress bar
function updateProgress() {
    const currentSlide = getCurrentSlideNumber();
    const progress = (currentSlide / slides.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('slideCounter').textContent = `${currentSlide}/${slides.length}`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize progress
    updateProgress();

    // Add navigation listeners
    document.getElementById('nextSlide')?.addEventListener('click', () => navigateToSlide(1));
    document.getElementById('prevSlide')?.addEventListener('click', () => navigateToSlide(-1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') navigateToSlide(1);
        if (e.key === 'ArrowLeft') navigateToSlide(-1);
    });

    // Initialize AOS
    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
});
