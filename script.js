// Fetch latest version from GitHub
async function fetchLatestVersion() {
    try {
        const response = await fetch('https://api.github.com/repos/Starbug10/Poly-Hub/releases/latest');
        const data = await response.json();
        const version = data.tag_name || data.name || '1.0.0';
        const versionElement = document.getElementById('version-number');
        if (versionElement) {
            versionElement.textContent = version;
        }
    } catch (error) {
        console.error('Failed to fetch version:', error);
        const versionElement = document.getElementById('version-number');
        if (versionElement) {
            versionElement.textContent = '1.0.0';
        }
    }
}

// Call on page load
if (document.getElementById('version-number')) {
    fetchLatestVersion();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for staggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe steps
document.querySelectorAll('.step').forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(30px)';
    step.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
    observer.observe(step);
});
