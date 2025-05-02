// Form handler for contact form submissions
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Handle form submission with AJAX
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form before submission
            if (!validateForm()) {
                return false;
            }
            
            // Show loading indicator
            const submitButton = contactForm.querySelector('.submit-button');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Create form data object
            const formData = new FormData(contactForm);
            
            // Convert FormData to JSON object
            const formDataJson = {};
            formData.forEach((value, key) => {
                formDataJson[key] = value;
            });
            
            // Add FormSubmit specific fields
            formDataJson['_subject'] = 'New message from PT Recycling website';
            formDataJson['_captcha'] = 'true';
            
            // Send form data using fetch
            fetch('https://formsubmit.co/ajax/simon.nam14@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formDataJson)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success === 'true' || data.success === true) {
                    // Show success message and redirect
                    window.location.href = 'thank-you.html';
                } else {
                    // Handle error
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                    alert('There was an error submitting the form. Please try again.');
                }
            })
            .catch(error => {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again.');
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
