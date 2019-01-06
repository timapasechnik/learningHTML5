// logic for the Count game

class NumberedBox extends createjs.Container {
  constructor(game, number=0){
    super();
    this.game = game;
    this.number = number;

    var movieclip = new lib.NumberedBox();
    movieclip.numberText.text = number;

    movieclip.numberText.font = "25px Staatliches";
    movieclip.numberText.textBaseLine = "alphabet";
    movieclip.numberText.x += 0;
    movieclip.numberText.y = 10;

    this.addChild(movieclip);

    this.setBounds(0,0,50,50);

    // handle click/tap
    this.on("click", this.handleClick.bind(this));
  }
  handleClick()
  {
    this.game.handleClick(this);
  }


}

// This class controls the game data.
class GameData{
  constructor(){
    this.amountOfBox = 3;
    this.resetData();
  }
  resetData(){
    this.currentNumber = 1;
  }
  nextNumber(){
    this.currentNumber += 1;
  }
  isRightNumber(number){
    return (number === this.currentNumber);
  }
  isGameWin(){
      // TODO
      return(this.currentNumber > this.amountOfBox);
  }

}

class Game{

  constructor(){
    console.log('Welcome to the game. Version '+this.version());
    let gameStage;
    this.canvas = document.getElementById("game-canvas");
    this.stage = new createjs.Stage(this.canvas);
    //gameStage = this.stage;
    window.debugStage = this.stage;
    // enable retina screen
    this.retinalize();

    // game related ititialization
    this.gameData = new GameData();

    // enable touch events
    createjs.Touch.enable(this.stage);
    createjs.Ticker.framerate = 60;
    //createjs.Ticker.setFPS(60);

    // keep re-drawing the stage.
    createjs.Ticker.on("tick", this.stage);

    this.restartGame();

  }
  version(){
    return '1.0.0';
  }

  generateMultipleBoxes(amount=10){
    for(var i=amount; i>0; i--)
    {
      var movieclip = new NumberedBox(this, i);
      // random position
      movieclip.x = Math.random()* (this.stage.width - movieclip.getBounds().width);
      movieclip.y = Math.random()* (this.stage.height- movieclip.getBounds().height);

      this.stage.addChild(movieclip);
    }
  }
  handleClick(numberedBox){
    if(this.gameData.isRightNumber(numberedBox.number)){
        this.stage.removeChild(numberedBox);
        this.gameData.nextNumber();

        // is game over?
        if(this.gameData.isGameWin()){
          var gameOverView = new lib.GameOverView();
          gameOverView.restartButton.on("click", (function(){
            this.restartGame();
          }).bind(this));
          this.stage.addChild(gameOverView);
       }
    }
  }
  restartGame(){
    this.gameData.resetData();
    this.stage.removeAllChildren();
    this.stage.addChild(new lib.Background());
    this.generateMultipleBoxes(this.gameData.amountOfBox);
    console.log("Reset");

  }
  retinalize(){
    this.stage.width = this.canvas.width;
    this.stage.height = this.canvas.height;

    let ratio = window.devicePixelRatio;
    if(ratio === undefined){
      return;
    }
    this.canvas.setAttribute('width', Math.round(this.stage.width * ratio));
    this.canvas.setAttribute('height', Math.round(this.stage.height * ratio));

    this.stage.scaleX = this.stage.scaleY = ratio;

    // Set CSS style
    this.canvas.style.width = this.stage.width + "px";
    this.canvas.style.height = this.stage.height + "px";

  }

}

// start the Game
var game = new Game();
