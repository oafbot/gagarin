function Menu(){
    this.Choices = ["Stats", "Items", "Action", "Equip"];
    
    this.Menu = {
        "Stats"  : ['HP', 'MP', 'Gold'],
        "Items"  : ['Potion'],
        "Action" : ['Spell']
    }
    
    this.height = this.Choices.length*30 + this.Choices.length*5;
    this.width  = Canvas.width - 650;
    this.Y = 5;
    this.X = 25;
    this.textX = (this.width / 3) - 10;
    this.textY = 25;
    this.caret = "\u25B8 ";
    this.caretPosition = 0;
    // this.Choices = "Stats\nItems\nAction\n";
    // this.Choices = "";
    
    this.Display = function(){
        Game.Pause();
        this.Render();
        Sound.PlaySound(Sound.OpenMenu, 1.0);
    }
    
    
    this.Render = function(){
    
        Context.textBaseline = 'middle';
        Context.font = "normal normal 16px monospace";
        
        Context.fillStyle = '#000000';
        Context.strokeStyle = '#FFFFFF';
        Context.globalAlpha = 0.80;
        Context.lineWidth = 3;

        Draw.RoundedRectangle(this.X, this.Y, this.width, this.height, 5, true, true);
        
        Context.globalAlpha = 1.0;
        Context.fillStyle = '#FFFFFF';
                
        // var textvalArr = this.MultiLine(this.Choices);
        var linespacing = 30;
        this.textY = 25;
        for(var i = 0; i < this.Choices.length; i++){
            if(i == this.caretPosition)
                var text = this.caret + this.Choices[i];
            else
                var text = "  " + this.Choices[i];
            Context.fillText(text, this.textX, this.textY);
            this.textY += linespacing;
        }
        
        // Context.fillText(this.Choices, this.textX, this.textY);
    }

    // Creates an array where the <br/> tag splits the values.
    this.MultiLine = function(text){
       var textArr = new Array();
       text = text.replace(/\n\r?/g, '<br/>');
       textArr = text.split("<br/>");
       return textArr;
    }
    
    this.Submenu = function(){
        Context.textBaseline = 'middle';
        Context.font = "normal normal 16px monospace";
        
        Context.fillStyle = '#000000';
        Context.strokeStyle = '#FFFFFF';
        Context.globalAlpha = 0.80;
        Context.lineWidth = 3;

        Draw.RoundedRectangle(200, 5, Canvas.width-225, this.height+100, 5, true, true);
        
        Context.globalAlpha = 1.0;
        Context.fillStyle = '#FFFFFF';
                
        // var textvalArr = this.MultiLine(this.Choices);
        // var linespacing = 30;
        // this.textY = 25;
        // for(var i = 0; i < this.Choices.length; i++){
        //     if(i == this.caretPosition)
        //         var text = this.caret + this.Choices[i];
        //     else
        //         var text = "  " + this.Choices[i];
        //     Context.fillText(text, this.textX, this.textY);
        //     this.textY += linespacing;
        // }
    }
    
}