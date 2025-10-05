// Review Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-wrapper a');
    const ratingText = document.getElementById('ratingText');
    const reviewForm = document.getElementById('reviewForm');
    const thankYou = document.getElementById('thankYou');
    let selectedRating = 0;

    // Rating text options
    const ratingTexts = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
    };

    // Star rating functionality
    stars.forEach((star, index) => {
        star.addEventListener('click', function(e) {
            e.preventDefault();
            selectedRating = parseInt(this.dataset.rating);
            updateStars(selectedRating);
            updateRatingText(selectedRating);
        });

        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
    });

    // Reset stars on mouse leave
    document.querySelector('.star-wrapper').addEventListener('mouseleave', function() {
        if (selectedRating > 0) {
            updateStars(selectedRating);
        } else {
            updateStars(0);
        }
    });

    function updateStars(rating) {
        stars.forEach((star, index) => {
            const starRating = parseInt(star.dataset.rating);
            if (starRating <= rating) {
                star.classList.add('active');
                star.style.color = '#ffd700';
            } else {
                star.classList.remove('active');
                star.style.color = '#ddd';
            }
        });
    }

    function highlightStars(rating) {
        stars.forEach((star, index) => {
            const starRating = parseInt(star.dataset.rating);
            if (starRating <= rating) {
                star.style.color = '#ffd700';
            } else {
                star.style.color = '#ddd';
            }
        });
    }

    function updateRatingText(rating) {
        if (ratingText) {
            ratingText.textContent = ratingTexts[rating] || 'Click to rate';
        }
    }

    // Form submission
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (selectedRating === 0) {
            alert('Please select a rating before submitting.');
            return;
        }

        const formData = new FormData(reviewForm);
        const reviewData = {
            name: formData.get('name'),
            email: formData.get('email'),
            review: formData.get('review'),
            rating: selectedRating,
            timestamp: new Date().toISOString()
        };

        // Simulate form submission (replace with actual API call)
        console.log('Review submitted:', reviewData);
        
        // Show thank you message
        reviewForm.style.display = 'none';
        thankYou.style.display = 'block';
        
        // Scroll to thank you message
        thankYou.scrollIntoView({ behavior: 'smooth' });

        // Optional: Send data to server
        // fetch('/api/reviews', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(reviewData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Review saved:', data);
        // })
        // .catch(error => {
        //     console.error('Error saving review:', error);
        // });
    });


    // Add some interactive effects
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        submitBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Form validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const reviewInput = document.getElementById('review');

    if (nameInput) {
        nameInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = '#667eea';
            } else {
                this.style.borderColor = '#e1e5e9';
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value.length > 0) {
                if (emailRegex.test(this.value)) {
                    this.style.borderColor = '#4CAF50';
                } else {
                    this.style.borderColor = '#f44336';
                }
            } else {
                this.style.borderColor = '#e1e5e9';
            }
        });
    }

    if (reviewInput) {
        reviewInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = '#667eea';
            } else {
                this.style.borderColor = '#e1e5e9';
            }
        });
    }

    // Add loading state to submit button
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            if (selectedRating > 0) {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
                this.disabled = true;
                
                // Re-enable after 2 seconds (simulate API call)
                setTimeout(() => {
                    this.innerHTML = 'Submit Review';
                    this.disabled = false;
                }, 2000);
            }
        });
    }
});

// Add some visual feedback for star interactions
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-wrapper a');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            // Add a subtle animation
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = 'scale(1.2)';
            }, 150);
        });
    });
});
