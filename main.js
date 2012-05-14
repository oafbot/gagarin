
/*----- INITIALIZATION ------*/

window.addEventListener('load',eventWindowLoaded,false);

function eventWindowLoaded(){
    Main = new Main();
}

function CanvasSupport(){
    return Modernizr.canvas;
}


/*----- MAIN -----*/

function Main(){
    if(!CanvasSupport){
        return;
    }
    else{
        Canvas  = document.getElementById("canvas");
        Context = Canvas.getContext("2d");
    }
    Game = new Game();
    Game.Run();                
}