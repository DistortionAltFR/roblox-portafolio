// Navigation Module - Handles mobile menu and navigation interactions

export function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuIcon = document.getElementById('menu-icon');
    let isMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; 
            menuIcon.classList.replace('ph-list', 'ph-x');
        } else {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
            menuIcon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Make toggleMenu accessible globally
    window.toggleMenu = () => {
        isMenuOpen = false;
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
        menuIcon.classList.replace('ph-x', 'ph-list');
    };
}
