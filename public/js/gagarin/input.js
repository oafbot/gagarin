function UserInput(){

    /**
    * KeyboardController.
    *
    */
    this.KeyboardController = function KeyboardController(keys, repeat){
        /* Lookup of key codes to timer ID, or null for no repeat */
        var timers= {};

        /**
        * When key is pressed and we don't already think it's pressed, call the
        * key action callback and set a timer to generate another one after a delay 
        */
        document.onkeydown = function(event) {
            var key= (event || window.event).keyCode;
            if (!(key in keys))
                return true;
            if (!(key in timers)) {
                timers[key]= null;
                keys[key]();
                if (repeat!==0)
                    timers[key]= setInterval(keys[key], repeat);
            }
            return false;
        };

        /* Cancel timeout and mark key as released on keyup */
        document.onkeyup = function(event) {
            var key= (event || window.event).keyCode;
            if (key in timers) {
                if (timers[key]!==null)
                    clearInterval(timers[key]);
                delete timers[key];
            }
        };

        /**
        * When window is unfocused we may not get key events. 
        * To prevent this causing a key to 'get stuck down', cancel all held keys 
        */
        window.onblur= function() {
            for (key in timers)
                if (timers[key]!==null)
                    clearInterval(timers[key]);
            timers= {};
        };

        /*window.onkeydown=function(e){
            if(e.keyCode==32){
                return false;
            }
        };*/
    }

   /**
    * CheckBounds.
    *
    */
    this.CheckBounds = function(d){

        if(Sprite.X == CENTER_X && Map.X >= 1)
            State.Scroll['LEFT'] = ON;
        else
            State.Scroll['LEFT'] = OFF;
        if( Sprite.X >= CENTER_X && Map.X < SCREEN_WIDTH )
            State.Scroll['RIGHT'] = ON;
        else 
            State.Scroll['RIGHT'] = OFF;

        if(Sprite.Y == CENTER_Y && Map.Y >= 1)
            State.Scroll['UP'] = ON;
        else
            State.Scroll['UP'] = OFF;
        if( Sprite.Y >= CENTER_Y && Map.Y < SCREEN_HEIGHT )
            State.Scroll['DOWN'] = ON;
        else
            State.Scroll['DOWN'] = OFF;

        if(Map.Traverse(d) && NPC.Collision(d)) return true;
        return false;
    }

   /**
    * Move.
    *
    */
    this.Move = function(d){
        if(State.Mode == GAME_STATE_ADVENTURE){
            switch(d){
                case 'LEFT':
                    if( this.CheckBounds(d) && State.Scroll[d] == ON ) Map.X -= 1;
                    else if( this.CheckBounds(d) && State.Scroll[d] == OFF ) Sprite.X -= 1;
                    State.Direction = ACTION_MOVE_LEFT;
                    break;
                case 'RIGHT':
                    if( this.CheckBounds(d) && State.Scroll[d] == ON ) Map.X += 1;
                    else if( this.CheckBounds(d) && State.Scroll[d] == OFF ) Sprite.X += 1;
                    State.Direction = ACTION_MOVE_RIGHT;
                    break;
                case 'UP':
                    if( this.CheckBounds(d) && State.Scroll[d] == ON ) Map.Y -= 1;
                    else if( this.CheckBounds(d) && State.Scroll[d] == OFF ) Sprite.Y -= 1;
                    State.Direction = ACTION_MOVE_UP;
                    break;
                case 'DOWN':
                    if( this.CheckBounds(d) && State.Scroll[d] == ON ) Map.Y += 1;
                    else if( this.CheckBounds(d) && State.Scroll[d] == OFF ) Sprite.Y += 1;
                    State.Direction = ACTION_MOVE_DOWN;
                    break;
            }
        }
        else if(State.Mode == GAME_STATE_MENU){
            switch(d){
                case 'LEFT':
                    break;
                case 'RIGHT':
                    break;
                case 'UP':
                    if(Menu.caretPosition > 0){
                        Menu.caretPosition--;
                        Game.Draw();
                        Sound.PlaySound(Sound.beep, 1.0);
                        Menu.Render();                        
                    }
                    break;
                case 'DOWN':
                    if(Menu.caretPosition < Menu.Choices.length-1){
                        Menu.caretPosition++;
                        Game.Draw();
                        Sound.PlaySound(Sound.beep, 1.0);
                        Menu.Render();
                    }
                    break;
            }
                 
        }        
        // if(State.Pause == GAME_STATE_PAUSED && 
        //     State.Mode != GAME_STATE_MENU   && 
        //     State.Mode != GAME_STATE_DIALOG && 
        //     State.Mode != GAME_STATE_EXIT   &&
        //     State.Mode != GAME_STATE_MULTI_DIALOG
        // ){
        //     Game.Unpause();
        //             State.Mode = GAME_STATE_ADVENTURE;
        //         }        
        Sprite.Frame++;
    }

    /**
    * Action.
    *
    */    
    this.Action = function(){
        if(State.Pause != GAME_STATE_PAUSED && State.Mode != GAME_STATE_EXIT){
            if(!NPC.Collision(State.Direction))
                Message.Initialize(NPC.Focus.chat);
            else 
                Message.Initialize('Nothing found.');
            State.Mode = GAME_STATE_EXIT;
        }
        else if(State.Mode == GAME_STATE_MENU){
             /*SELECT from Menu*/
             console.log("SELECT");
             Sound.PlaySound(Sound.OpenMenu, 1.0);
             Menu.Submenu();
        }
        else if(State.Mode == GAME_STATE_EXIT){
            this.Menu()
            // console.log("EXIT")
        }
        else{
            Message.MultiLineDialog();
        }
    }

    /**
    * Menu.
    *
    */ 
    this.Menu = function(){
        if(State.Mode == GAME_STATE_DIALOG || State.Mode == GAME_STATE_EXIT || State.Mode == GAME_STATE_MULTI_DIALOG){
            /*Clear dialog escape*/
            console.log("CLEAR DIALOG")
            
            Message.Initialize('');
            State.Mode = GAME_STATE_ADVENTURE;
            Game.Unpause();
            Sound.PlaySound(Sound.boop, 1.0);
        }
        else if(State.Pause != GAME_STATE_PAUSED && State.Mode != GAME_STATE_DIALOG && State.Mode != GAME_STATE_MULTI_DIALOG){
            Menu.Display();
            State.Mode = GAME_STATE_MENU;
        }
        else{
            Game.Unpause();
            State.Mode = GAME_STATE_ADVENTURE;
            Sound.PlaySound(Sound.boop, 1.0);
            Menu.caretPosition = 0;
        }
    }
}
