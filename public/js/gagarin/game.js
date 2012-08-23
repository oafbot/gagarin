const DRAW_INTERVAL = 300;
const KEY_INTERVAL  = 300;
const DIALOG_INTERVAL = 150;

const OFF           = 0;
const ON            = 1;

/**
* Game
*
*/
function Game(){
   /**
    * Run
    * Run the game
    */
    this.Run = function(){
        this.Initialize();        
        this.LoadContent();
        this.RunGameLoop();
    }


   /**
    * Initialize.
    * Initialize all game variables
    */
    this.Initialize = function(){
        
        Context.fillStyle = "#000000";
        Context.fillRect(0,0,800,480);
        Draw = new Draw(); 
        
        State = new StateMachine();
        State.Scroll = {'UP':ON,'RIGHT':ON,'DOWN':ON,'LEFT':ON};
        
        Input = new UserInput(); 

        KeyboardController({
        37: function() { Input.Move('LEFT');  },
        38: function() { Input.Move('UP');    },
        39: function() { Input.Move('RIGHT'); },
        40: function() { Input.Move('DOWN');  },
        65: function() { Input.Action(); },
        32: function() { Input.Action(); }
        }, KEY_INTERVAL);
               
    }
    
    
   /**
    * LoadContent
    * Load content Ð graphics, sound etc.
    */
    this.LoadContent = function(){
        Map   = new Map();
        Map.X = 0;
        Map.Y = 0;
        Map.Initialize();
        
        Sprite = new Sprite();
        NPC = new Sprite.NonPlayerChar();
        NPC.Initialize();
        
        Message = new Message();
        //MPC = Sprite.MainChar();
        
              
        //this.GameLoop = setInterval(this.RunGameLoop, DRAW_INTERVAL);
    }
    
    this.LoadComplete = function(){
        this.GameLoop = setInterval(this.RunGameLoop, DRAW_INTERVAL);
    }
    
   /**
    * RunGameLoop.
    * The main game loop
    */
    this.RunGameLoop = function(){
        State.CheckState();
        Game.Update();
        Game.Draw();
    }
    
    this.Pause = function(){
        clearInterval(this.GameLoop);
        State.pause = GAME_STATE_PAUSED;
    }
    
    this.Unpause = function(){
        clearInterval(this.GameLoop);
        this.LoadComplete();
        State.pause = GAME_STATE_RUNNING;
    }
            
   /**
    * Update.
    * Update game variables, handle user input, perform calculations etc.
    */
    this.Update = function(){}
    
   /**
    * Draw.
    * Render graphics to screen
    */
    this.Draw = function(){
        
        /* console.log(Math.floor(NPC.X/TILE_DIMENSION)); */
        /* console.log(Math.floor(NPC.Y/TILE_DIMENSION)); */
        /* console.log('Y:'+Sprite.Y); */
        /* console.log('X:'+Sprite.X); */
        
        Map.Render(Map.X,Map.Y);
        Sprite.Render(Sprite.X,Sprite.Y);
        NPC.Render();
        Message.Render();
    }
}
