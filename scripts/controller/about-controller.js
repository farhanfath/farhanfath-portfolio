export function setupAboutToggle() {
    const aboutToggle = document.getElementById('about-toggle');
    const aboutText = document.getElementById('about-text');
    const fullAboutText = "Android Engineer with 2+ years shipping production-grade features used by millions of Alfagift loyalty app users. I specialize in Kotlin & Jetpack Compose, designing clean MVVM architectures, integrating AI capabilities (Gemini, TensorFlow Lite), and running R&D on next-gen mobile experiences. Beyond mobile, I manage IT infrastructure — 7 servers, 144 thin clients, and VMware virtualization environments. Distinction Graduate of Bangkit Academy (Google × Gojek × Tokopedia × Traveloka) and a certified BNSP Junior Mobile Programmer. I don't just write code — I engineer impact.";
    const shortAboutText = "Android Engineer with 2+ years shipping production-grade features used by millions of Alfagift loyalty app users. I specialize in Kotlin & Jetpack Compose, designing clean MVVM architectures and integrating AI capabilities...";

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