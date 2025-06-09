document.addEventListener('DOMContentLoaded', function() {
    const dynamicText = document.querySelector('.dynamic-text');
    const professions = [
        "Web Developer",
        "Web Designer",
        "Prompt Engineer",
        "Graphic Designer"
    ];



    
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed in ms
    
    function typeText() {
        const currentProfession = professions[professionIndex];
        
        if (isDeleting) {
            // Deleting text
            dynamicText.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            dynamicText.textContent = currentProfession.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        // If finished typing the word
        if (!isDeleting && charIndex === currentProfession.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause before deleting
        } 
        // If finished deleting the word
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start the typing animation
    typeText();
});

document.addEventListener('DOMContentLoaded', function() {
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let isMoving = false;
    let restTimeout;
    let hideTimeout;
    let isHidden = false;

    // Initial position (off-screen)
    follower.style.left = '-100px';
    follower.style.top = '-100px';

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        // If hidden, show it again
        if (isHidden) {
            isHidden = false;
            follower.classList.remove('hidden');
        }
        
        // Clear timeouts when moving
        clearTimeout(restTimeout);
        clearTimeout(hideTimeout);
        
        // Set timeout for resting state
        restTimeout = setTimeout(() => {
            follower.classList.add('resting');
            
            // Set timeout for hiding after 1 minute of inactivity
            hideTimeout = setTimeout(() => {
                follower.classList.add('hidden');
                isHidden = true;
            }, 30000); 
        }, 300); 
        
        // Remove resting state when moving
        follower.classList.remove('resting');
    });

    // Animation loop for smooth following
    function animateFollower() {
        // Calculate distance between follower and cursor
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        
        // Ease the movement (adjust the divisor for different speeds)
        // When resting, move faster to reach the cursor
        const speed = follower.classList.contains('resting') ? 3 : 8;
        
        followerX += dx / speed;
        followerY += dy / speed;
        
        // Apply the position
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        
        // Continue the animation loop
        requestAnimationFrame(animateFollower);
    }

    // Start the animation loop
    animateFollower();

    // Add some interactive effects when clicking
    document.addEventListener('mousedown', () => {
        follower.style.transform = 'translate(-50%, -50%) scale(0.8)';
        follower.style.backgroundColor = 'rgba(79, 0, 113, 0.99)';
    });

    document.addEventListener('mouseup', () => {
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.backgroundColor = 'rgba(52, 18, 87, 0.6)';
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden, pause animations
            clearTimeout(restTimeout);
            clearTimeout(hideTimeout);
        } else {
            // Page is visible again, reset
            follower.classList.remove('resting', 'hidden');
            isHidden = false;
        }
    });
});
