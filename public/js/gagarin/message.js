function Message(){

    Context.textBaseline = 'middle';
    Context.font = "normal normal 16px monospace";
    
    this.message;
    this.multiline = new Array();
    this.metrics = Context.measureText(this.message);
    
    this.height = 80;
    this.width  = Canvas.width - 50;
    this.Y = Canvas.height - 100;
    this.X = 25;
    
    this.textWidth = this.metrics.width;
    this.textX = (Canvas.width / 2) - (this.textWidth / 2);
    this.textY = this.Y + (this.height / 2);

    this.line = 0;
    this.counter = 0;
    this.multi = false;
    this.disp = "";
    
    this.Initialize = function(msg){
        if( msg.length > 64 ){                        
            this.multiline = this.Split(msg, 64);            
            this.SetLine();
            this.multi = true;
        }
        else{ 
            this.message = msg;
            this.multi = false;
        }
    }
    
    this.Render = function(){
        if(this.message){
            Game.Pause();
            this.Dialog();
            // State.Mode = GAME_STATE_DIALOG;
        }
    }
    
    this.SetLine = function(){
        this.message = this.multiline[this.line];
    }
    
    this.Dialog = function(){                
        this.metrics = Context.measureText(this.message);
        this.textWidth = this.metrics.width;
        this.textX = (Canvas.width / 2) - (this.textWidth / 2);
        
        if(this.multi){
            this.SetLine();
            if(this.line < this.multiline.length-2)
                State.Mode = GAME_STATE_MULTI_DIALOG;
        }
        
        if(this.message){
            Game.GameLoop = setInterval(Game.RunGameLoop, DIALOG_INTERVAL);
            
            Context.fillStyle = '#000000';
            Context.strokeStyle = '#FFFFFF';
            Context.globalAlpha = 0.80;
            Context.lineWidth = 3;
            Draw.RoundedRectangle(this.X, this.Y, this.width, this.height, 5, true, true);
            
            Context.globalAlpha = 1.0;
            Context.fillStyle = '#FFFFFF';
                        
            if(this.counter<this.message.length){
                this.disp += this.message[this.counter];
                this.counter++;
                Sound.PlaySound(Sound.beep, 0.5);
            }      
            Context.fillText(this.disp, this.textX, this.textY);                                      
        }      
    }
    
    this.MultiLineDialog = function(){
        if(this.line >= this.multiline.length-2)
            State.Mode = GAME_STATE_EXIT;
        if(this.multi && this.line < this.multiline.length){
            this.line++;
            this.disp = "";
            this.counter = 0;
        }
    }
    
    this.ClearDialog = function(){
        this.disp = "";
        this.counter = 0;
        this.line = 0;
        this.multi = false;
    }
    
    
    this.Split = function(str,limit){ 
        var multiline = new Array();        
        var i = 0;
        
        while(str.length > limit){           
            var temp = str.substr(0, limit);
            i = temp.lastIndexOf(' ');
            multiline.push(str.substr(0, i) + "  \u25BE");
            str = str.substr(i);
            if(str.length <= limit){
                multiline.push(str);
                str = "";
            }
        }
        return multiline;
    }    
}