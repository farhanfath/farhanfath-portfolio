export function setupAboutToggle() {
    const aboutToggle = document.getElementById('about-toggle');
    const aboutText = document.getElementById('about-text');
    const fullAboutText = "I am a dedicated Informatics student at Gunadarma University and an Android Developer passionate about mobile technology. With a solid foundation in programming, a keen interest in solving real-world problems, and a drive to create impactful solutions, I am continuously learning and growing in the ever-evolving field of mobile development.";
    const shortAboutText = "I am a dedicated Informatics student at Gunadarma University and an Android Developer passionate about mobile technology. With a solid foundation in programming, a keen interest in solving real-world problems...";

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