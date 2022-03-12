'use strict' // vanilla js

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient( 0, canvas.width, canvas.height, 0);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'yellow');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.6, 'cyan');
gradient.addColorStop(0.8, 'blue');
gradient.addColorStop(1, 'magenta');


class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = '나랏 말ᄊᆞ미 듀ᇰ귁에 달아 문ᄍᆞᆼ와로 서르 ᄉᆞᄆᆞᆺ디 아니ᄒᆞᆯᄊᆡ이런 젼ᄎᆞ로 어린 ᄇᆡᆨ서ᇰ이 니르고져 홇배 이셔도 ᄆᆞᄎᆞᆷ내 제 뜨들 >시러펴디 몯 ᄒᆞᆶ노미 하니라 내 이ᄅᆞᆯ 윙ᄒᆞ야 어엿비 너겨 새로 스믈여듧 ᄍᆞᆼᄅᆞᆯ ᄆᆡᇰᄀᆞ노니 사ᄅᆞᆷ마다 ᄒᆡᅇᅧ 수ᄫᅵ 니겨 날로 ᄡᅮ메뼌ᅙᅡᆫ킈 ᄒᆞ고져 ᄒᆞᆶ ᄯᆞᄅᆞ미니라.';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.initialize();
        console.log(this.symbols);
    }
    initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }

    }
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight =height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
        ctx.fillStyle = 'rgba( 0, 0, 0, 0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = gradient //'#0aff0a';
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
    gradient = ctx.createLinearGradient( 0, canvas.width, canvas.height, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.2, 'yellow');
    gradient.addColorStop(0.4, 'green');
    gradient.addColorStop(0.6, 'cyan');
    gradient.addColorStop(0.8, 'blue');
    gradient.addColorStop(1, 'magenta');
});
