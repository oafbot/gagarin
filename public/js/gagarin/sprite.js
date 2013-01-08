const SPRITE_FRAME_COUNT = 4;
const FACE_UP    = 2;
const FACE_DOWN  = 0;
const FACE_LEFT  = 3;
const FACE_RIGHT = 1;
/**
* Sprite.
*
*/
function Sprite(){    
    this.X = CENTER_X;
    this.Y = CENTER_Y;
    this.Frame= 0;
   
   /**
    * Render.
    *
    */
    this.Render = function(x,y){

        var sprite = new Image();
        
        if(Sprite.Frame >= SPRITE_FRAME_COUNT)
            Sprite.Frame = 0;
        //sprite.addEventListener('load', eventSpriteLoaded, false);
        sprite.src = GAGARIN_ROMS+"/demo/images/sprite-red.png";
                
        switch(State.Direction){
            case ACTION_MOVE_LEFT:
                var sourceY = 3*TILE_DIMENSION;
                break;
            case ACTION_MOVE_RIGHT:
                var sourceY = TILE_DIMENSION;
                break;
            case ACTION_MOVE_UP:
                var sourceY = 2*TILE_DIMENSION;
                break;
            case ACTION_MOVE_DOWN:
                var sourceY = 0;
                break;
            default:
                var sourceY = 0;
                break;            
        }            
        var sourceX = Sprite.Frame*TILE_DIMENSION;
        
        Context.drawImage(sprite, sourceX, sourceY, TILE_DIMENSION, TILE_DIMENSION, 
            x*TILE_DIMENSION, y*TILE_DIMENSION, TILE_DIMENSION, TILE_DIMENSION);            
    }    
    
    this.MainPlayerChar = function(){}
        
    /**
    * NonPlayerChar.
    * 
    */    
    this.NonPlayerChar = function(){
        
        this.sourceX = 0;
        this.Frame   = 0;
        this.Cast = Array();
        this.X;
        this.Y;
        this.Focus;
        
		/**
		* Initialize.
		* Populate and render all sprites.
		*/
        this.Initialize = function(){
                                
            for( var i=0; i<Map.Objects.length; i++ ){
                
                if(Map.Objects[i].getAttribute("type") == 'npc'){                    
                    var x = Map.Objects[i].getAttribute("x");
                    var y = Map.Objects[i].getAttribute("y");
                    var src = GAGARIN_ROMS+"/demo/images/sprite.png";                    
                    
                    x = -((Map.X*TILE_DIMENSION) - x);
                    y = -((Map.Y*TILE_DIMENSION) - y);                       
                }
                     
                var prop = Map.Objects[i].getElementsByTagName('property');
                
                for( var n=0; n<prop.length; n++ ){
                    if(prop[n].getAttribute('name') == 'direction')                    
                        var d = Number(prop[n].getAttribute('value'));
                    
                    if(prop[n].getAttribute('name') == 'id')                    
                        var id = Number(prop[n].getAttribute('value'));
                    
                    if(prop[n].getAttribute('name') == 'chat')                    
                        var chat = prop[n].getAttribute('value');
                }
                
                this.Cast[i] = { 
                    "id":id,
                    "Sprite":src, 
                    "X":x, 
                    "Y":y, 
                    "prevX":x, 
                    "prevY":y,
                    "startX":x,
                    "startY":y, 
                    "startD":d, 
                    "Direction":d,
                    "chat":chat
                };
                
            }          
        }
                                
        this.Render = function(){            
            if(State.Pause != GAME_STATE_PAUSED)
				this.Frame++;
            if(this.Frame >= SPRITE_FRAME_COUNT)
                this.Frame = 0;
            if(State.Pause == GAME_STATE_PAUSED && this.Frame == 3)
                this.Frame = 1;
            
            this.sourceX = this.Frame*TILE_DIMENSION;

            for(var i=0; i<this.Cast.length; i++){                                        
                
                sourceY = this.Cast[i].Direction*TILE_DIMENSION;
                
                switch(this.Cast[i].Direction){   
                    case FACE_RIGHT:
                        if(!(Sprite.X-1 == Math.round(this.Cast[i].X/TILE_DIMENSION) 
                            && Sprite.Y == Math.round(this.Cast[i].Y/TILE_DIMENSION))){
                            this.Cast[i].X = -((Map.X*TILE_DIMENSION) - this.Cast[i].prevX) + (this.Frame)*TILE_DIMENSION;
                            if(this.Frame >= 3){                            
                                this.Cast[i].Direction = FACE_LEFT;
                                if(this.Cast[i].startD == FACE_RIGHT)
                                    this.Cast[i].prevX = this.Cast[i].startX+3*TILE_DIMENSION;
                                else
                                    this.Cast[i].prevX = this.Cast[i].startX;                                                           
                            }
                        } //else this.Frame = 0;
                        this.Cast[i].Y = -((Map.Y*TILE_DIMENSION) - this.Cast[i].prevY);
                        break;
                    
                    case FACE_LEFT:
                        if(!(Sprite.X+1 == Math.round(this.Cast[i].X/TILE_DIMENSION) 
                            && Sprite.Y == Math.round(this.Cast[i].Y/TILE_DIMENSION))){ 
                            this.Cast[i].X = -((Map.X*TILE_DIMENSION) - this.Cast[i].prevX) - (this.Frame)*TILE_DIMENSION;
                            if(this.Frame >= 3){
                                this.Cast[i].Direction = FACE_RIGHT;
                                if(this.Cast[i].startD == FACE_LEFT)
                                    this.Cast[i].prevX = this.Cast[i].startX-3*TILE_DIMENSION;
                                else
                                    this.Cast[i].prevX = this.Cast[i].startX;
                            }
                        } //else this.Frame = 0;
                        this.Cast[i].Y = -((Map.Y*TILE_DIMENSION) - this.Cast[i].prevY);
                        break;
                    
                    case FACE_DOWN:
                        if(!(Sprite.Y-1 == Math.round(this.Cast[i].Y/TILE_DIMENSION) 
                            && Sprite.X == Math.round(this.Cast[i].X/TILE_DIMENSION))){ 
                            this.Cast[i].Y = -((Map.Y*TILE_DIMENSION) - this.Cast[i].prevY) + (this.Frame)*TILE_DIMENSION;
                            
                            if(this.Frame >= 3){
                                this.Cast[i].Direction = FACE_UP;
                                if(this.Cast[i].startD == FACE_DOWN)
                                    this.Cast[i].prevY = this.Cast[i].startY+3*TILE_DIMENSION;
                                else
                                    this.Cast[i].prevY = this.Cast[i].startY;
                            }                                 
                        }
                        this.Cast[i].X = -((Map.X*TILE_DIMENSION) - this.Cast[i].prevX);
                        break;
                    
                    case FACE_UP:
                        if(!(Sprite.Y+1 == Math.round(this.Cast[i].Y/TILE_DIMENSION)
                            && Sprite.X == Math.round(this.Cast[i].X/TILE_DIMENSION))){ 
                            this.Cast[i].Y = -((Map.Y*TILE_DIMENSION) - this.Cast[i].prevY) - (this.Frame)*TILE_DIMENSION;
                            if(this.Frame >= 3){     
                                this.Cast[i].Direction = FACE_DOWN;
                                if(this.Cast[i].startD == FACE_UP)
                                    this.Cast[i].prevY = this.Cast[i].startY-3*TILE_DIMENSION;
                                else
                                    this.Cast[i].prevY = this.Cast[i].startY;
                            }
                        }
                        this.Cast[i].X = -((Map.X*TILE_DIMENSION) - this.Cast[i].prevX);
                        break;                                                                       
                }
                //this.Cast[i].X = -((Map.X*TILE_DIMENSION) - this.Cast[i].origX);
                //this.Cast[i].Y = -((Map.Y*TILE_DIMENSION) - this.Cast[i].origY);
                
                var npc = new Image();
                npc.src = this.Cast[i].Sprite;                                
                Context.drawImage(npc, this.sourceX, sourceY, TILE_DIMENSION, TILE_DIMENSION, 
                        this.Cast[i].X, this.Cast[i].Y, TILE_DIMENSION, TILE_DIMENSION);
            }
        }
        
        /**
        * Collision.		
		* Collision check for sprites. 	
        */                
        this.Collision = function(d){            
            for(var i =0; i<this.Cast.length; i++){
                switch(d){
                    case 'LEFT':
                        if(Sprite.X-1 == Math.round(this.Cast[i].X/TILE_DIMENSION) 
                            && Sprite.Y == Math.round(this.Cast[i].Y/TILE_DIMENSION)){
                            this.Focus = this.Cast[i];
                            return false;}
                        break;
                    case 'RIGHT':
                        if(Sprite.X+1 == Math.round(this.Cast[i].X/TILE_DIMENSION) 
                            && Sprite.Y == Math.round(this.Cast[i].Y/TILE_DIMENSION)){
                            this.Focus = this.Cast[i];
                            return false;}
                        break;
                    case 'UP':
                        if(Sprite.Y-1 == Math.round(this.Cast[i].Y/TILE_DIMENSION) 
                            && Sprite.X == Math.round(this.Cast[i].X/TILE_DIMENSION)){
                            this.Focus = this.Cast[i];
                            return false;}
                        break;
                    case 'DOWN':
                        if(Sprite.Y+1 == Math.round(this.Cast[i].Y/TILE_DIMENSION)
                            && Sprite.X == Math.round(this.Cast[i].X/TILE_DIMENSION)){
                            this.Focus = this.Cast[i];
                            return false;}
                        break;
                }            
            }
            Message.message = null;
            this.Focus = null;
            return true;       
        }
    }
}