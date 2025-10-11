// Review Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-wrapper a');
    const ratingText = document.getElementById('ratingText');
    const reviewForm = document.getElementById('reviewForm');
    const thankYou = document.getElementById('thankYou');
    const submitBtn = document.querySelector('.submit-btn');
    let selectedRating = 0;
    let userData = null;
    let isSubmitting = false; // Flag to prevent multiple submissions

    // Get BIS parameter and user data
    const urlParams = new URLSearchParams(window.location.search);
    const businessNumber = urlParams.get('BIS');

    // Load user data if BIS parameter exists
    if (businessNumber) {
        loadUserData(businessNumber);
    }

    // Rating text options
    const ratingTexts = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
    };

    // Initially hide submit button
    if (submitBtn) {
        submitBtn.style.display = 'none';
    }

    // Star rating functionality
    stars.forEach((star, index) => {
        star.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Prevent multiple submissions
            if (isSubmitting) {
                return;
            }
            
            selectedRating = parseInt(this.dataset.rating);
            updateStars(selectedRating);
            updateRatingText(selectedRating);
            handleRatingSelection(selectedRating);
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

    // Load user data to get Google Review URL and buttons
    async function loadUserData(businessNumber) {
        try {
            const response = await fetch(`/api/user/${businessNumber}`);
            const data = await response.json();
            
            if (data.success) {
                userData = data.user;
                console.log('User data loaded:', userData);
                
                // Load action buttons if they exist
                loadActionButtons(userData.buttons);
                
                // Load social links if they exist
                loadSocialLinks(userData.socialLinks);
            } else {
                console.error('Failed to load user data:', data.error);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    // Load action buttons from user data
    function loadActionButtons(buttons) {
        const container = document.getElementById('actionButtonsContainer');
        const grid = document.getElementById('actionButtonsGrid');
        
        if (!buttons || !Array.isArray(buttons) || buttons.length === 0) {
            // No buttons to display
            return;
        }

        // Filter enabled buttons only
        const enabledButtons = buttons.filter(button => button.enabled !== false);
        
        if (enabledButtons.length === 0) {
            // No enabled buttons to display
            return;
        }
        
        // Clear existing buttons
        grid.innerHTML = '';
        
        // Create button elements
        enabledButtons.forEach(button => {
            const buttonElement = createActionButton(button);
            grid.appendChild(buttonElement);
        });
        
        // Show the container
        container.style.display = 'block';
    }

    // Create individual action button element
    function createActionButton(button) {
        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'action-button';
        buttonDiv.onclick = () => handleButtonClick(button.url);
        
        // Create button content
        let buttonContent = '';
        
        if (button.icon && (button.icon.startsWith('http') || button.icon.includes('data:image'))) {
            // Use custom icon/image
            buttonContent = `
                <div class="button-icon">
                    <img src="${button.icon}" alt="${button.text}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="fallback-icon" style="display: none;">
                        <i class="fas fa-link"></i>
                    </div>
                </div>
            `;
            } else {
            // Use default icon
            buttonContent = `
                <div class="button-icon">
                    <i class="fas fa-link"></i>
                </div>
            `;
        }
        
        buttonContent += `
            <div class="button-text">
                <span>${button.text}</span>
            </div>
        `;
        
        buttonDiv.innerHTML = buttonContent;
        return buttonDiv;
    }

    // Handle button click
    function handleButtonClick(url) {
        if (url) {
            // Open URL in new tab
            window.open(url, '_blank');
        } else {
            console.error('No URL provided for button');
        }
    }

    // Load social links from user data
    function loadSocialLinks(socialLinks) {
        const container = document.getElementById('socialLinksContainer');
        
        if (!socialLinks || !Array.isArray(socialLinks) || socialLinks.length === 0) {
            // No social links to display, hide the footer section
            const footer = document.querySelector('.review-footer');
            if (footer) {
                footer.style.display = 'none';
            }
            return;
        }
        
        // Filter enabled social links only
        const enabledSocialLinks = socialLinks.filter(social => social.enabled !== false);
        
        if (enabledSocialLinks.length === 0) {
            // No enabled social links, hide the footer section
            const footer = document.querySelector('.review-footer');
            if (footer) {
                footer.style.display = 'none';
            }
            return;
        }
        
        // Clear existing social links
        container.innerHTML = '';
        
        // Create social link elements
        enabledSocialLinks.forEach(social => {
            const socialElement = createSocialLink(social);
            container.appendChild(socialElement);
        });
        
        // Show the footer section
        const footer = document.querySelector('.review-footer');
        if (footer) {
            footer.style.display = 'block';
        }
    }

    // Create individual social link element
    function createSocialLink(social) {
        const linkElement = document.createElement('a');
        linkElement.className = 'social-link';
        linkElement.href = social.url;
        linkElement.target = '_blank';
        linkElement.rel = 'noopener noreferrer';
        
        // Extract platform name from icon class for title
        const platformName = getPlatformName(social.icon);
        linkElement.title = platformName;
        
        // Create icon element
        const iconElement = document.createElement('i');
        iconElement.className = social.icon;
        
        linkElement.appendChild(iconElement);
        return linkElement;
    }

    // Get platform name from icon class
    function getPlatformName(iconClass) {
        const platformMap = {
            'fab fa-facebook': 'Facebook',
            'fab fa-facebook-f': 'Facebook',
            'fab fa-twitter': 'Twitter',
            'fab fa-instagram': 'Instagram',
            'fab fa-linkedin': 'LinkedIn',
            'fab fa-linkedin-in': 'LinkedIn',
            'fab fa-youtube': 'YouTube',
            'fab fa-whatsapp': 'WhatsApp',
            'fab fa-telegram': 'Telegram',
            'fab fa-discord': 'Discord',
            'fab fa-github': 'GitHub',
            'fab fa-twitch': 'Twitch',
            'fab fa-tiktok': 'TikTok',
            'fab fa-snapchat': 'Snapchat',
            'fab fa-pinterest': 'Pinterest',
            'fab fa-reddit': 'Reddit',
            'fab fa-skype': 'Skype',
            'fab fa-viber': 'Viber',
            'fab fa-wechat': 'WeChat',
            'fab fa-snapchat-ghost': 'Snapchat',
            'fab fa-google-plus': 'Google+',
            'fab fa-vimeo': 'Vimeo'
        };
        
        return platformMap[iconClass] || 'Social Media';
    }

    // Handle rating selection logic
    function handleRatingSelection(rating) {
        // Set flag to prevent multiple submissions
        isSubmitting = true;
        
        // Add loading state to stars
        stars.forEach(star => {
            star.style.opacity = '0.6';
            star.style.pointerEvents = 'none';
        });
        
        // Get minimum rating threshold from user data (default to 0 if not set)
        const minimumRating = userData ? (userData.minimumRating || 0) : 0;
        
        if (rating >= minimumRating) {
            // Rating meets or exceeds threshold: Redirect to Google Review URL
            redirectToGoogleReview();
        } else {
            // Rating below threshold: Auto-submit and redirect to thank you page
            submitReview(rating);
        }
    }

    // Submit review for ratings below minimum threshold
    async function submitReview(rating) {
        try {
            const reviewData = {
                businessNumber: businessNumber,
                rating: rating,
                timestamp: new Date().toISOString(),
                type: 'internal_review'
            };

            const response = await fetch('/api/submit-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData)
            });

            const data = await response.json();

            if (data.success) {
                // Redirect to thank you page instead of showing popup
                redirectToThankYouPage(rating);
            } else {
                console.error('Failed to submit review:', data.error);
                // Still redirect to thank you page even if API fails
                redirectToThankYouPage(rating);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            // Still redirect to thank you page even if API fails
            redirectToThankYouPage(rating);
        }
    }

    // Redirect to thank you page
    function redirectToThankYouPage(rating) {
        const params = new URLSearchParams();
        if (businessNumber) {
            params.append('BIS', businessNumber);
        }
        if (rating) {
            params.append('rating', rating);
        }
        
        const thankYouUrl = `/thank-you?${params.toString()}`;
        window.location.href = thankYouUrl;
    }

    // Redirect to Google Review URL
    function redirectToGoogleReview() {
        if (userData && userData.reviewUrl) {
            // Open Google Review URL in new tab
            window.open(userData.reviewUrl, '_blank');
        } else {
            // Fallback: Show message that no Google Review URL is available
            alert('Thank you for your positive rating! Unfortunately, we don\'t have a Google Review link set up yet. Your feedback is still appreciated!');
        }
    }

    // Form submission (now handled automatically by star clicks)
    // The submit button is hidden and reviews are submitted automatically


    // Submit button is now hidden and not used

    // Form validation and loading states removed since we use automatic submission
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
