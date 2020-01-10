var myBackgroud;
var myScore;

function startGame() {
    gameScreen.start();
    myGamePiece = new component(75, 75, "assets/images/cat-icon.png", 10, 120, "image");
    myBackground = new component(750, 500, "assets/images/background.jpg", 0, 0, "image");
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
}

var gameScreen = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 750;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameScreen, 20);
        window.addEventListener('keydown', function (e) {
            gameScreen.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            gameScreen.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = gameScreen.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
function updateGameScreen() {
    gameScreen.clear();
    gameScreen.frameNo += 1;
    myBackground.newPos();   
    myBackground.update();
    myScore.text = "SCORE: " + gameScreen.frameNo;
    myScore.update();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (gameScreen.key && gameScreen.key == 37) { myGamePiece.speedX = -2; }
    if (gameScreen.key && gameScreen.key == 39) { myGamePiece.speedX = 2; }
    if (gameScreen.key && gameScreen.key == 38) { myGamePiece.speedY = -2; }
    if (gameScreen.key && gameScreen.key == 40) { myGamePiece.speedY = 2; }
    myGamePiece.newPos();
    myGamePiece.update();
}