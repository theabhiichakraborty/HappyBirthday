const textContainer = document.getElementById('text-container');
const iconContainer = document.getElementById('icon-container');
const texts = [
    "Hey!",
    "Why its so dark here?",
    "Friend, Can you turn on the light please"
];

let index = 0;

function showText() {
    textContainer.textContent = texts[index];
    textContainer.classList.add('fade-in');
    
    setTimeout(() => {
        textContainer.classList.remove('fade-in');
        textContainer.classList.add('fade-out');

        setTimeout(() => {
            textContainer.classList.remove('fade-out');
            index++;
            if (index < texts.length) {
                showText();
            } else {
                // Show light bulb icon after the last text message
                textContainer.style.display = 'none'; // Hide text container
                iconContainer.style.display = 'flex'; // Show icon container
                iconContainer.classList.add('fade-in');
            }
        }, 1000); // Duration for fade-out transition
    }, 2000); // Duration for fade-in transition
}

showText();
