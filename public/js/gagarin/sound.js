function Sound(){
    
    this.SupportedFormat = function(audio){
        if(audio.canPlayType("audio/ogg") == "probably" ||
                audio.canPlayType("audio/ogg") == "maybe"){
               return ".ogg";
        }
        else if(audio.canPlayType("audio/wav") == "probably" ||
           audio.canPlayType("audio/wav") == "maybe"){
               return ".wav";
        }
        else if(audio.canPlayType("audio/mp3") == "probably" ||
                audio.canPlayType("audio/mp3") == "maybe"){
               return ".mp3";
        }
        return ".wav";
    }    
    
    this.AudioLoaded = function(){}
    
    this.beep = document.createElement("audio");
    document.body.appendChild(this.beep);
    this.audiotype = this.SupportedFormat(this.beep);
    this.beep.setAttribute("src", GAGARIN_ROMS + "/demo/sounds/shortbeep" + this.audiotype);
    this.beep.addEventListener("canplaythrough", this.AudioLoaded, false);
    
    this.boop = document.createElement("audio");
    document.body.appendChild(this.boop);
    this.audiotype = this.SupportedFormat(this.boop);
    this.boop.setAttribute("src", GAGARIN_ROMS + "/demo/sounds/boop" + this.audiotype);
    this.boop.addEventListener("canplaythrough", this.AudioLoaded, false);

    this.OpenMenu = document.createElement("audio");
    document.body.appendChild(this.OpenMenu);
    this.audiotype = this.SupportedFormat(this.OpenMenu);
    // this.OpenMenu.setAttribute("src", GAGARIN_ROMS + "/demo/sounds/button-21" + this.audiotype);
    this.OpenMenu.setAttribute("src", GAGARIN_ROMS + "/demo/sounds/beep-24" + this.audiotype);
    this.OpenMenu.addEventListener("canplaythrough", this.AudioLoaded, false);

    
    this.PlaySound = function(snd,volume){
        //var temp = document.createElement("audio");
        //temp.setAttribute("src", sound + audiotype);
        snd.loop = false;
        snd.volume = volume;
        snd.play();
        //sounds.push(sound);
    }
    

}