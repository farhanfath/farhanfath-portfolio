export const skillsData = [
    {
        id: 'mobile',
        title: 'Mobile Development',
        icon: 'smartphone',
        accentClass: 'skill-accent-mobile',
        skills: [
            { name: 'Kotlin', level: 5 },
            { name: 'Android SDK', level: 5 },
            { name: 'MVVM Architecture', level: 5 },
            { name: 'Jetpack Compose', level: 4 },
            { name: 'Firebase', level: 4 },
            { name: 'Room Database', level: 4 },
            { name: 'Retrofit / OkHttp', level: 4 },
            { name: 'LiveData / ViewModel', level: 4 },
            { name: 'CameraX', level: 3 },
            { name: 'Paging 3', level: 3 },
        ]
    },
    {
        id: 'languages',
        title: 'Programming Languages',
        icon: 'code-2',
        accentClass: 'skill-accent-lang',
        skills: [
            { name: 'Kotlin', level: 5 },
            { name: 'Java', level: 4 },
            { name: 'JavaScript', level: 3 },
            { name: 'Python', level: 3 },
            { name: 'PHP', level: 3 },
            { name: 'Go', level: 2 },
            { name: 'Delphi', level: 2 },
        ]
    },
    {
        id: 'ai-ml',
        title: 'AI & Machine Learning',
        icon: 'brain',
        accentClass: 'skill-accent-ai',
        skills: [
            { name: 'Gemini API', level: 3 },
            { name: 'TensorFlow Lite', level: 3 },
            { name: 'Google Vision API', level: 3 },
            { name: 'N8n Automation', level: 3 },
            { name: 'OpenCV', level: 2 },
            { name: 'NumPy / Pandas', level: 2 },
        ]
    },
    {
        id: 'infrastructure',
        title: 'IT Infrastructure',
        icon: 'server',
        accentClass: 'skill-accent-infra',
        skills: [
            { name: 'VMware / vSphere', level: 4 },
            { name: 'Thin Client Management', level: 4 },
            { name: 'Moodle LMS', level: 4 },
            { name: 'Linux Server Admin', level: 3 },
            { name: 'Access Control (ACL)', level: 3 },
            { name: 'Network Configuration', level: 3 },
        ]
    },
    {
        id: 'web',
        title: 'Web & Backend',
        icon: 'globe',
        accentClass: 'skill-accent-web',
        skills: [
            { name: 'REST API Integration', level: 4 },
            { name: 'Tailwind CSS', level: 4 },
            { name: 'Laravel', level: 3 },
            { name: 'Filament Admin', level: 3 },
            { name: 'MySQL', level: 3 },
            { name: 'Livewire', level: 2 },
            { name: 'Bootstrap', level: 3 },
        ]
    },
    {
        id: 'tools',
        title: 'Tools & Platforms',
        icon: 'wrench',
        accentClass: 'skill-accent-tools',
        skills: [
            { name: 'Android Studio', level: 5 },
            { name: 'Git / GitHub', level: 4 },
            { name: 'Localazy', level: 4 },
            { name: 'Postman', level: 4 },
            { name: 'Figma', level: 3 },
            { name: 'Technical Spec (TSD)', level: 4 },
        ]
    }
];

export const levelLabels = {
    5: { label: 'Expert', class: 'level-expert' },
    4: { label: 'Advanced', class: 'level-advanced' },
    3: { label: 'Intermediate', class: 'level-intermediate' },
    2: { label: 'Familiar', class: 'level-familiar' },
    1: { label: 'Learning', class: 'level-learning' },
};
