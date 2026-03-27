/**
 * main.js
 * Handles general UI interactions and the terminal typing animation.
 */

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Typing Animation for Hero Section ---
    const typeWriterElement = document.getElementById('typewriter-cmd');
    const heroContent = document.getElementById('hero-content');
    const textToType = "./initialize_krishna.exe";
    let i = 0;

    // Slight delay before typing starts
    setTimeout(() => {
        typeWriter();
    }, 500);

    function typeWriter() {
        if (i < textToType.length) {
            typeWriterElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 50 + 50); // random delay for natural feel
        } else {
            // Finished typing
            setTimeout(() => {
                // Reveal the rest of the hero section
                heroContent.classList.remove('opacity-0');
            }, 300);
        }
    }

    // --- 2. Intersection Observer for Fade-In Effects ---
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- 3. Navbar logic (Blur and border on scroll) ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('border-white/10', 'bg-dark/95');
            navbar.classList.remove('border-white/5', 'bg-dark/80');
        } else {
            navbar.classList.add('border-white/5', 'bg-dark/80');
            navbar.classList.remove('border-white/10', 'bg-dark/95');
        }
    });

    // --- 4. Mobile Menu logic ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

});
