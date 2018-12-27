// logic for the Count game

class NumberedBox extends createjs.Container {
  constructor(game, number=0){
    super();
    this.game = game;
    var movieclip = new lib.NumberedBox();
    movieclip.numberText.text = number;
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



class Game{

  constructor(){
    console.log('Welcome to the game. Version ${this.version()}');

    this.canvas = document.getElementById("game-canvas");
    this.stage = new createjs.Stage(this.canvas);

    this.stage.width = this.canvas.width;
    this.stage.height = this.canvas.height;


    window.debugStage = this.stage;


    createjs.Ticker.framerate = 60;
    //createjs.Ticker.setFPS(60);

    // keep re-drawing the stage.
    createjs.Ticker.on("tick", this.stage);

    this.stage.addChild(new lib.Background());
    this.generateMultipleBoxes();

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
  handleClick(NumberedBox){
    this.stage.removeChild(NumberedBox);
  }
}

// start the Game
var game = new Game();
