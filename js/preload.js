/**
 * PT Recycling - Dark Mode Preload Script
 * 
 * This script runs before the page renders to prevent flash of light mode content
 * when dark mode is enabled. It also helps prevent navbar animation during page load.
 */

(function() {
    // Apply dark mode immediately if needed
    const currentTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.classList.add('dark-mode-preload');
    }
    
    // Prevent layout shift during page load
    document.documentElement.style.scrollPaddingTop = '80px';
    
    // Force hardware acceleration for header to prevent animation
    document.addEventListener('DOMContentLoaded', function() {
        const header = document.querySelector('header');
        if (header) {
            header.style.transform = 'none';
            header.style.backfaceVisibility = 'hidden';
            header.style.webkitBackfaceVisibility = 'hidden';
        }
        
        // Remove preload class after page is fully loaded
        setTimeout(function() {
            document.documentElement.classList.remove('dark-mode-preload');
        }, 100);
    });
})();
