
// Typing animation
const typingText = document.getElementById('typing-text');
const texts = [
    'Mobile Developer & IT Infrastructure Engineer',
    'Android Developer',
    'Course Instructor & Technology Enthusiast',
    'Automation Enthusiast'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

export function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}