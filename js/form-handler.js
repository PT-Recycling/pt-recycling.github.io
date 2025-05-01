// Form handler for contact form submissions
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // For a static site, we'll use Formspree or a similar service
            // Replace 'your-formspree-endpoint' in the HTML with your actual endpoint
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Send the form data
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Show success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                    </div>
                `;
            })
            .catch(error => {
                // Show error message
                console.error('Error:', error);
                alert('There was a problem sending your message. Please try again or contact us directly by phone.');
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });
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
