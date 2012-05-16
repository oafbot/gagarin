const SPRITE_FRAME_COUNT = 4;
const FACE_UP    = 2;
const FACE_DOWN  = 0;
const FACE_LEFT  = 3;
const FACE_RIGHT = 1;
/**
* Sprite
*
* 
*
*/
function Sprite(){    
    this.X = CENTER_X;
    this.Y = CENTER_Y;
    this.Frame= 0;    
   
   /**
    * Render
    *
    * 
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
    
    this.MainChar      = function(){}
    



    
        
    this.NonPlayerChar = function(){
        
        this.sourceX = 0;
        this.Frame   = 0;
        this.People = Array();
        this.X;
        this.Y;
        
        
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
                }
                
                this.People[i] = { 
                    "Sprite":src, 
                    "X":x, 
                    "Y":y, 
                    "prevX":x, 
                    "prevY":y,
                    "startX":x,
                    "startY":y, 
                    "startD":d, 
                    "Direction":d,
                };
                
            }          
        }
                                
        this.Render = function(){            
            this.Frame++;
            if(this.Frame >= SPRITE_FRAME_COUNT){this.Frame = 0;}
            this.sourceX = this.Frame*TILE_DIMENSION;
            
            for(var i=0; i<this.People.length; i++){
                                        
                sourceY = this.People[i].Direction*TILE_DIMENSION;
                
                switch(this.People[i].Direction){   
                    case FACE_RIGHT:
                        if(!(Sprite.X-1 == Math.round(this.People[i].X/TILE_DIMENSION) 
                            && Sprite.Y == Math.round(this.People[i].Y/TILE_DIMENSION))){
                            this.People[i].X = -((Map.X*TILE_DIMENSION) - this.People[i].prevX) + (this.Frame)*TILE_DIMENSION;
                            if(this.Frame >= 3){                            
                                this.People[i].Direction = FACE_LEFT;
                                if(this.People[i].startD == FACE_RIGHT)
                                    this.People[i].prevX = this.People[i].startX+3*TILE_DIMENSION;
                                else
                                    this.People[i].prevX = this.People[i].startX;                                                           
                            }
                        } //else this.Frame = 0;
                        this.People[i].Y = -((Map.Y*TILE_DIMENSION) - this.People[i].prevY);
                        break;
                    
                    case FACE_LEFT:
                        if(!(Sprite.X+1 == Math.round(this.People[i].X/TILE_DIMENSION) 
                            && Sprite.Y == Math.round(this.People[i].Y/TILE_DIMENSION))){ 
                            this.People[i].X = -((Map.X*TILE_DIMENSION) - this.People[i].prevX) - (this.Frame)*TILE_DIMENSION;
                            if(this.Frame >= 3){
                                this.People[i].Direction = FACE_RIGHT;
                                if(this.People[i].startD == FACE_LEFT)
                                    this.People[i].prevX = this.People[i].startX-3*TILE_DIMENSION;
                                else
                                    this.People[i].prevX = this.People[i].startX;
                            }
                        } //else this.Frame = 0;
                        this.People[i].Y = -((Map.Y*TILE_DIMENSION) - this.People[i].prevY);
                        break;
                    
                    case FACE_DOWN:
                        if(!(Sprite.Y-1 == Math.round(this.People[i].Y/TILE_DIMENSION) 
                            && Sprite.X == Math.round(this.People[i].X/TILE_DIMENSION))){ 
                            this.People[i].Y = -((Map.Y*TILE_DIMENSION) - this.People[i].prevY) + (this.Frame)*TILE_DIMENSION;
                            
                            if(this.Frame >= 3){
                                this.People[i].Direction = FACE_UP;
                                if(this.People[i].startD == FACE_DOWN)
                                    this.People[i].prevY = this.People[i].startY+3*TILE_DIMENSION;
                                else
                                    this.People[i].prevY = this.People[i].startY;
                            }                                 
                        }
                        this.People[i].X = -((Map.X*TILE_DIMENSION) - this.People[i].prevX);
                        break;
                    
                    case FACE_UP:
                        if(!(Sprite.Y+1 == Math.round(this.People[i].Y/TILE_DIMENSION)
                            && Sprite.X == Math.round(this.People[i].X/TILE_DIMENSION))){ 
                            this.People[i].Y = -((Map.Y*TILE_DIMENSION) - this.People[i].prevY) - (this.Frame)*TILE_DIMENSION;
                            if(this.Frame >= 3){     
                                this.People[i].Direction = FACE_DOWN;
                                if(this.People[i].startD == FACE_UP)
                                    this.People[i].prevY = this.People[i].startY-3*TILE_DIMENSION;
                                else
                                    this.People[i].prevY = this.People[i].startY;
                            }
                        }
                        this.People[i].X = -((Map.X*TILE_DIMENSION) - this.People[i].prevX);
                        break;                                                                       
                }
                                
                //this.People[i].X = -((Map.X*TILE_DIMENSION) - this.People[i].origX);
                //this.People[i].Y = -((Map.Y*TILE_DIMENSION) - this.People[i].origY);
                
                var npc = new Image();
                npc.src = this.People[i].Sprite;                                
                Context.drawImage(npc, this.sourceX, sourceY, TILE_DIMENSION, TILE_DIMENSION, 
                        this.People[i].X, this.People[i].Y, TILE_DIMENSION, TILE_DIMENSION);
            }
        }
        
                        
        this.Collision = function(d){            
            for(var i =0; i<this.People.length; i++){
                switch(d){
                    case 'LEFT':
                        if(Sprite.X-1 == Math.round(this.People[i].X/TILE_DIMENSION) 
                            && Sprite.Y == Math.round(this.People[i].Y/TILE_DIMENSION))
                            return false;
                        break;
                    case 'RIGHT':
                        if(Sprite.X+1 == Math.round(this.People[i].X/TILE_DIMENSION) 
                            && Sprite.Y == Math.round(this.People[i].Y/TILE_DIMENSION))
                            return false;
                        break;
                    case 'UP':
                        if(Sprite.Y-1 == Math.round(this.People[i].Y/TILE_DIMENSION) 
                            && Sprite.X == Math.round(this.People[i].X/TILE_DIMENSION))
                            return false;
                        break;
                    case 'DOWN':
                        if(Sprite.Y+1 == Math.round(this.People[i].Y/TILE_DIMENSION)
                            && Sprite.X == Math.round(this.People[i].X/TILE_DIMENSION))
                            return false;
                        break;
                }            
            }
            return true;       
        }
    }
}