tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
            },
            colors: {
                primary: '#000000',
                secondary: '#374151',
                accent: '#6B7280',
                dark: {
                    bg: '#121212',
                    card: '#1E1E1E',
                    text: '#F3F4F6',
                    border: '#333333',
                    accent: '#E5E7EB'
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'fade-in-down': 'fadeInDown 0.6s ease-out',
                'fade-in-left': 'fadeInLeft 0.6s ease-out',
                'fade-in-right': 'fadeInRight 0.6s ease-out',
                'scale-in': 'scaleIn 0.5s ease-out',
                'slide-up': 'slideUp 0.8s ease-out',
                'bounce-slow': 'bounce 3s infinite',
                'pulse-slow': 'pulse 4s infinite',
                'wiggle': 'wiggle 1s ease-in-out infinite',
            }
        }
    }
}