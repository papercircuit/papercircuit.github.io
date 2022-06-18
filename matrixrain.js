const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0,0, canvas.width, canvas.height);
gradient.addColorStop(0, 'rgb(168,168,168)');
gradient.addColorStop(0.2, 'rgb(184,184,184)');
gradient.addColorStop(0.4, 'rgb(211,211,211)');
gradient.addColorStop(0.6, 'rgb(240,240,240)');
gradient.addColorStop(0.8, 'rgb(248,248,248)');
gradient.addColorStop(1, 'grey');

class Symbol {
    constructor(x, y, fontSize, canvasHeight){
        this.characters = '.||||||||||:||||||||||';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
     
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (Math.random() > 0.98){
            this.y = 0;
        } else {
            this.y += .98;
        }
    } 
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 20;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
    #initialize(){
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns =  this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}
const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 40;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0,0,0,0.3)';//gradient; //'#0aff0a';
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
  
    requestAnimationFrame(animate);
}
animate(0);

//resize event listener
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
effect.resize(canvas.width, canvas.height);
});