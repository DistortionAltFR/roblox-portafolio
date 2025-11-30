export function initTypewriter() {
    const words = ["OOP ARCHITECTURE", "DATA SAFETY", "MODULAR SYSTEMS"];
    let wordIndex = 0;
    
    function typeWriter() {
        const element = document.getElementById("typewriter");
        if(!element) return;
        const word = words[wordIndex];
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            element.innerText = word.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === word.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    const deleteInterval = setInterval(() => {
                        element.innerText = word.substring(0, charIndex);
                        charIndex--;
                        if (charIndex < 0) {
                            clearInterval(deleteInterval);
                            wordIndex = (wordIndex + 1) % words.length;
                            typeWriter();
                        }
                    }, 50);
                }, 2000);
            }
        }, 100);
    }
    typeWriter();
}

export function copyToClipboard(text, label) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification(label);
    }).catch(err => {});
}

export function showNotification(label) {
    const notif = document.getElementById('notification');
    const notifText = document.getElementById('notification-text');
    
    notifText.innerText = `${label} copied successfully`;
    notif.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
    
    setTimeout(() => {
        notif.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
    }, 3000);
}

export function initClock() {
    function updateClock() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const gmt5Time = new Date(utc - (3600000 * 5));
        const clockElement = document.getElementById('gmt-clock');
        if (clockElement) {
            clockElement.innerText = gmt5Time.toLocaleTimeString('en-US', {hour12: false});
        }
    }
    setInterval(updateClock, 1000);
    updateClock();
}

window.copyToClipboard = copyToClipboard;
