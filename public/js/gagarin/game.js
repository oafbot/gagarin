const DRAW_INTERVAL = 300;
const KEY_INTERVAL  = 300;
const DIALOG_INTERVAL = 15;

const OFF           = 0;
const ON            = 1;

/**
 * Game
 *
 */
function Game(){
   /**
    * Run.
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
        State.Mode = GAME_STATE_ADVENTURE;
        
        Input = new UserInput(); 

        Input.KeyboardController({
            37: function() { Input.Move('LEFT');  },
            38: function() { Input.Move('UP');    },
            39: function() { Input.Move('RIGHT'); },
            40: function() { Input.Move('DOWN');  },
            32: function() {},
            65: function() { Input.Action(); },
            // 83: function() { Input.Menu(); },
            90: function() { Input.Action(); },
            88: function() { Input.Menu(); }
        }, KEY_INTERVAL);
               
    }
        
   /**
    * LoadContent.
    * Load map, graphics, sound... etc.
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
        Sound   = new Sound();
        Menu    = new Menu();
        
        //MPC = Sprite.MainChar();      
    }
    
   /**
    * LoadComplete.
    *
    */
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
    
   /**
    * Pause.
    *
    */
    this.Pause = function(){
        clearInterval(this.GameLoop);
        State.Pause = GAME_STATE_PAUSED;
    }
    
   /**
    * Unpause.
    *
    */
    this.Unpause = function(){
        clearInterval(this.GameLoop);
        this.GameLoop = setInterval(this.RunGameLoop, DRAW_INTERVAL);
        Message.ClearDialog();
        State.Pause = GAME_STATE_RUNNING;
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
        Map.Render(Map.X,Map.Y);
        Sprite.Render(Sprite.X,Sprite.Y);
        NPC.Render();
        Message.Render();

        // console.log("Mode: " + State.Mode);
        // console.log("Pause: " + State.Pause);

    }
}
