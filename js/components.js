document.addEventListener('DOMContentLoaded', function() {
    // Load the navbar component
    fetch('/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // Add active class to current page in navbar
            setTimeout(() => {
                const currentPage = window.location.pathname.split('/').pop();
                const navLinks = document.querySelectorAll('header nav a');
                
                navLinks.forEach(link => {
                    const linkHref = link.getAttribute('href');
                    if (currentPage === linkHref || 
                        (currentPage === '' && linkHref === 'index.html')) {
                        link.classList.add('active');
                    }
                });
            }, 100);
        });
    
    // Load the footer component
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});
