// Smooth Page Fade In
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
});

// Smooth Page Transition on Link Click
document.querySelectorAll("a").forEach(link => {
    if (link.hostname === window.location.hostname) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = this.href;

            document.body.classList.remove("loaded");
            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    }
});

// Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".hidden").forEach(el => {
    observer.observe(el);
});
