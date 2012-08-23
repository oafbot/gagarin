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

    this.counter = 0;
    this.m = "";
    
    this.Initialize = function(msg){
        if( msg.length > 64 ){
/*
            multiline = this.Split(m, 64);
            this.message = multiline[0];
*/
            this.message = msg.substr(0,64);
            var n = this.message.lastIndexOf(' ');
            this.message = this.message.substr(0,n);
            this.message += "  \u25BE";
        }
        else{ this.message = msg; }
    }

    this.Render = function(){
        
        this.metrics = Context.measureText(this.message);
        this.textWidth = this.metrics.width;
        this.textX = (Canvas.width / 2) - (this.textWidth / 2);
        
        if(this.message){
            Context.fillStyle = '#000000';
            Context.strokeStyle = '#FFFFFF';
            Context.globalAlpha = 0.80;
            Context.lineWidth = 3;
            Draw.RoundedRectangle(this.X, this.Y, this.width, this.height, 5, true, true);
			Game.Pause;
/*
            var msg = this.message;
            if( this.message.length > 64 ){
                this.multiline = this.Split(this.message, 64);
                this.message = State.multiline[0];
*/
/*
                this.message = this.message.substr(0,64);
                var n = this.message.lastIndexOf(' ');
                this.message = this.message.substr(0,n);
                this.message += "  \u25BE";
               
*/
                            
            Context.globalAlpha = 1.0;
            Context.fillStyle = '#FFFFFF';           
            // clearInterval(Game.RunGameLoop);
            // Game.RunGameLoop = setInterval(this.Render, 10);
            
            Game.GameLoop = setInterval(Game.RunGameLoop, DIALOG_INTERVAL);
            this.m += this.message[this.counter];
            Context.fillText(this.m, this.textX, this.textY);

            if(this.counter<this.message.length)
                           this.counter++;
                         
        }
        //this.ClearDialog();
    }
    
    this.Dialog = function(){
      
    }
    
    this.ClearDialog = function(){
        Game.Unpause();
    }
    
    this.Split = function(str,limit){ 
        //var i = 0;
        //var temp = "";
        //var msg = "";
        var multiline = new Array();
        
        while(str.length > 0){
            var temp = str.substr(i, limit);
            var i = temp.lastIndexOf(' ');            
            multiline.push(temp.substr(0, i) + "  \u25BE");
            str = str.substr(i);
        }
        return multiline;
    }

    
}