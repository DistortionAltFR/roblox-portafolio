export function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d', { alpha: false });
    
    let width, height;
    const fontSize = 14;
    let drops = [];
    const chars = '01XYZ<>_[]AB'; 
    let lastFrameTime = 0;
    const fpsInterval = 1000 / 30;

    function setCanvasSize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        const columns = Math.ceil(width / fontSize);
        drops = new Array(columns).fill(1);
        ctx.fillStyle = '#050b14';
        ctx.fillRect(0, 0, width, height);
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setCanvasSize, 200);
    });
    setCanvasSize();

    function draw(currentTime) {
        requestAnimationFrame(draw);

        const elapsed = currentTime - lastFrameTime;
        if (elapsed < fpsInterval) return;
        lastFrameTime = currentTime - (elapsed % fpsInterval);

        ctx.fillStyle = 'rgba(5, 11, 20, 0.2)'; 
        ctx.fillRect(0, 0, width, height);

        ctx.font = fontSize + 'px JetBrains Mono';
        
        for (let i = 0; i < drops.length; i++) {
            if(Math.random() > 0.5) { 
                const text = chars[Math.floor(Math.random() * chars.length)];
                
                if(Math.random() > 0.98) {
                    ctx.fillStyle = '#fff'; 
                } else {
                    ctx.fillStyle = '#00b8e6'; 
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
    }
    requestAnimationFrame(draw);
}
