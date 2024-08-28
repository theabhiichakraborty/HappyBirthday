document.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.getElementById('message');
    
    function fadeInOut() {
        messageElement.style.opacity = 0;
        setTimeout(() => {
            messageElement.textContent = "Wanna have a look of your memories";
            messageElement.style.opacity = 1;
        }, 2000); // Wait for 2 seconds before changing text
    }
    
    setTimeout(fadeInOut, 2000); // Start fading after 2 seconds
});
