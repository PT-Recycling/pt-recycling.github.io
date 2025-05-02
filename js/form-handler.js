// Form handler for contact form submissions
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form validation only - no submission handling
        // FormSubmit.co will handle the actual submission
    }
    
    // Form validation
    const validateForm = () => {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
        
        // Simple validation
        if (name && name.value.trim() === '') {
            isValid = false;
            highlightField(name);
        }
        
        if (email && email.value.trim() === '') {
            isValid = false;
            highlightField(email);
        }
        
        if (message && message.value.trim() === '') {
            isValid = false;
            highlightField(message);
        }
        
        return isValid;
    };
    
    const highlightField = (field) => {
        field.style.borderColor = 'red';
        field.addEventListener('input', function() {
            if (field.value.trim() !== '') {
                field.style.borderColor = '#ccc';
            }
        });
    };
    
    // Add validation to form
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            if (input.hasAttribute('required')) {
                input.addEventListener('blur', function() {
                    if (input.value.trim() === '') {
                        highlightField(input);
                    }
                });
            }
        });
    }
});
