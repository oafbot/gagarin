function UserInput(){
   /**
    * CheckBounds
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
    * Move
    *
    */
    this.Move  = function(d){
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
		//State.pause = GAME_STATE_RUNNING;
        Sprite.Frame++;
    }
    
    this.Action = function(){
        if(!NPC.Collision(State.Direction))
            Message.Initialize(NPC.Focus.chat);
        else Message.Initialize('Nothing found...');
    }
}


/**
* KeyboardController
*
*/
function KeyboardController(keys, repeat){
    // Lookup of key codes to timer ID, or null for no repeat
    var timers= {};
    
    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
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
    
    // Cancel timeout and mark key as released on keyup
    document.onkeyup = function(event) {
        var key= (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key]!==null)
                clearInterval(timers[key]);
            delete timers[key];
        }
    };
    
    // When window is unfocused we may not get key events. To prevent this
    // causing a key to 'get stuck down', cancel all held keys
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