document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('background-video');
    const enterButton = document.getElementById('enter-button');
    
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
    
    // Simple click event for the enter button
    enterButton.addEventListener('click', () => {
        // Fade out current content
        document.querySelector('.content').style.opacity = '0';
        document.querySelector('.content').style.transition = 'opacity 1s ease';
        
        // Could redirect to another page or show new content
        setTimeout(() => {
            alert('Autonomy isn\'t given - it\'s taken. The slutverse is coming. Stay sharp. Stay curious. Stay free.');
            document.querySelector('.content').style.opacity = '1';
        }, 1000);
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
