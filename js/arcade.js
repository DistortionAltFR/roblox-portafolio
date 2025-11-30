import { initTTT } from './tictactoe.js';
import { stopSnake } from './snake.js';

export function toggleArcade() {
    const main = document.getElementById('main-view');
    const arcade = document.getElementById('arcade-view');
    
    if (arcade.classList.contains('active')) {
        arcade.classList.remove('active');
        setTimeout(() => arcade.style.display = 'none', 300);
        main.style.display = 'block';
        setTimeout(() => main.style.opacity = '1', 10);
        document.body.style.overflow = '';
        stopSnake();
    } else {
        main.style.opacity = '0';
        setTimeout(() => main.style.display = 'none', 300);
        arcade.style.display = 'flex';
        setTimeout(() => arcade.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
        initTTT();
    }
}

window.toggleArcade = toggleArcade;
