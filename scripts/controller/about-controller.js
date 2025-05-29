export function setupAboutToggle() {
    const aboutToggle = document.getElementById('about-toggle');
    const aboutText = document.getElementById('about-text');
    const fullAboutText = "Computer Science undergraduate at Gunadarma University with practical experience in Android development using Kotlin and Jetpack Compose. Actively engaged in projects and internships that focus on creating user-friendly applications. Keen to further develop professional skills in a dynamic tech environment. Passionate about mobile development, machine learning, and system administration. Always eager to learn new technologies and contribute to innovative projects that make a positive impact on society.";
    const shortAboutText = "Computer Science undergraduate at Gunadarma University with practical experience in Android development using Kotlin and Jetpack Compose. Actively engaged in projects and internships that focus on creating user-friendly applications...";

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