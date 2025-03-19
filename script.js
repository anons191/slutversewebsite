document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('background-music');
    const soundToggle = document.getElementById('sound-toggle');
    let musicPlaying = false;
    
    // Function to toggle music
    function toggleMusic() {
        if (musicPlaying) {
            backgroundMusic.pause();
            soundToggle.innerHTML = '🔇 Sound Off';
            musicPlaying = false;
        } else {
            backgroundMusic.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
            soundToggle.innerHTML = '🔊 Sound On';
            musicPlaying = true;
        }
    }
    
    // Add click event for sound toggle button
    soundToggle.addEventListener('click', toggleMusic);
    
    // Allow user to start music with any click on the page (needed for autoplay restrictions)
    document.body.addEventListener('click', function startMusicOnInteraction() {
        if (!musicPlaying) {
            // Try to start music on first interaction (browsers often block autoplay)
            backgroundMusic.play().then(() => {
                soundToggle.innerHTML = '🔊 Sound On';
                musicPlaying = true;
            }).catch(error => {
                console.error("Audio playback failed on interaction:", error);
            });
            // Remove this listener after first click
            document.body.removeEventListener('click', startMusicOnInteraction);
        }
    });

    const video = document.getElementById('background-video');
    const enterButton = document.getElementById('enter-button');
    const artistStatementButton = document.getElementById('artist-statement');
    
    // Ensure video plays
    video.play().catch(error => {
        console.error("Video playback failed:", error);
        // Try playing again on user interaction
        document.body.addEventListener('click', () => {
            video.play().catch(e => console.error("Still failed to play:", e));
        }, { once: true });
    });
    
    // Custom positioning for mobile to ensure video fills screen properly
    const handleMobileVideo = () => {
        if (window.innerWidth <= 1024) {
            // For mobile devices, we'll use CSS transform scale, but also need to
            // ensure the video is centered properly
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            // Force the video to be centered by using transform-origin
            video.style.transformOrigin = 'center center';
            
            // No need for margin adjustments with the scale approach
            video.style.marginTop = '0';
            video.style.marginLeft = '0';
        } else {
            // Reset for desktop
            video.style.transform = 'none';
            video.style.objectFit = 'contain';
            video.style.marginTop = '0';
            video.style.marginLeft = '0';
        }
    };
    
    // Apply video adjustments when video metadata is loaded
    video.addEventListener('loadedmetadata', handleMobileVideo);
    
    // Update on window resize
    window.addEventListener('resize', handleMobileVideo);
    
    // Click event for the enter button
    enterButton.addEventListener('click', () => {
        // Fade out current content
        document.querySelector('.content').style.opacity = '0';
        document.querySelector('.content').style.transition = 'opacity 1s ease';
        
        // Redirect to the new navigation page
        setTimeout(() => {
            window.location.href = 'slutverse-navigation.html';
        }, 1000);
    });
    
    // Click event for the artist statement button
    artistStatementButton.addEventListener('click', () => {
        // Navigate to the artist statement page
        window.location.href = 'artist-statement.html';
    });
    
    // Add a subtle parallax effect on mouse movement for desktop only
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            
            const content = document.querySelector('.content');
            content.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
            content.style.transition = 'transform 0.5s ease-out';
        });
    }
});
