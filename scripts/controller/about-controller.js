export function setupAboutToggle() {
    const aboutToggle = document.getElementById('about-toggle');
    const aboutText = document.getElementById('about-text');
    const fullAboutText = "Software Engineer focused on building scalable and maintainable digital products. Strong experience in Kotlin-based development, system architecture, and modern UI frameworks. Experienced in designing clean, modular systems with emphasis on performance, automation, and long-term sustainability. Currently exploring cross-platform and orchestration-based solutions to build efficient, future-proof software ecosystems";
    const shortAboutText = "Software Engineer focused on building scalable and maintainable digital products. Strong experience in Kotlin-based development, system architecture, and modern UI frameworks...";

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