export function initAnimations() {
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" 
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || "";
    const duration = 2000;     
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    
    let currentFrame = 0;

    const timer = setInterval(() => {
        currentFrame++;
        
        const progress = currentFrame / totalFrames;
        const currentValue = Math.round(target * progress);

        if (currentFrame >= totalFrames) {
            el.textContent = target + suffix;
            clearInterval(timer);
        } else {
            el.textContent = currentValue + suffix;
        }
    }, frameRate);
}