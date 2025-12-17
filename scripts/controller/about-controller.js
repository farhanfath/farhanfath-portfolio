export function setupAboutToggle() {
    const aboutToggle = document.getElementById('about-toggle');
    const aboutText = document.getElementById('about-text');
    const fullAboutText = "Android Developer specializing in Kotlin, Jetpack Compose, and Clean Architecture. Experienced in building scalable, maintainable mobile applications with a focus on user experience and performance. Currently exploring Kotlin Multiplatform (KMP) to create unified cross-platform solutions. Passionate about continuous learning, automation, and crafting clean, modern UI experiences.";
    const shortAboutText = "Android Developer specializing in Kotlin, Jetpack Compose, and Clean Architecture. Experienced in building scalable, maintainable mobile applications with a focus on user experience and performance...";

    let aboutExpanded = false;
    aboutText.textContent = shortAboutText;

    aboutToggle.addEventListener('click', () => {
        aboutExpanded = !aboutExpanded;
        aboutText.textContent = aboutExpanded ? fullAboutText : shortAboutText;
        aboutToggle.querySelector('.show-more').classList.toggle('hidden', aboutExpanded);
        aboutToggle.querySelector('.show-less').classList.toggle('hidden', !aboutExpanded);
        aboutToggle.querySelector('.show-more-icon').classList.toggle('hidden', aboutExpanded);
        aboutToggle.querySelector('.show-less-icon').classList.toggle('hidden', !aboutExpanded);
    });
}