document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");

    // Retrieve the active page from localStorage
    const activePage = localStorage.getItem("activeNav");

    if (activePage) {
        document.querySelector(".nav-item.active")?.classList.remove("active");
        document.querySelector(`.nav-item[href="${activePage}"]`)?.classList.add("active");
    }

    navItems.forEach(item => {
        item.addEventListener("click", function () {
            document.querySelector(".nav-item.active")?.classList.remove("active");
            this.classList.add("active");

            // Store the active page in localStorage
            localStorage.setItem("activeNav", this.getAttribute("href"));
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    let slideInterval;

    function changeSlide() {
        slides[currentSlide].classList.remove("active");
        slides[currentSlide].classList.add("fade-out");

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.remove("fade-out");
        slides[currentSlide].classList.add("active");
    }

    function startSlideshow() {
        slideInterval = setInterval(changeSlide, 5000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Start slideshow
    startSlideshow();

    // Pause on hover
    document.querySelector(".hero").addEventListener("mouseenter", stopSlideshow);
    document.querySelector(".hero").addEventListener("mouseleave", startSlideshow);
});
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".count");
    const options = { threshold: 0.5 };

    function startCounting(entry) {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute("data-target");
            let count = 0;
            const speed = target / 300;

            const updateCount = () => {
                if (count < target) {
                    count += speed;
                    entry.target.innerText = Math.floor(count);
                    requestAnimationFrame(updateCount);
                } else {
                    entry.target.innerText = target;
                }
            };
            updateCount();
            observer.unobserve(entry.target);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(startCounting);
    }, options);

    counters.forEach(counter => observer.observe(counter));
});
function toggleNav() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}
