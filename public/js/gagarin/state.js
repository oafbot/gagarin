const ACTION_MOVE_LEFT  = 'LEFT';  //37
const ACTION_MOVE_UP    = 'UP';    //38
const ACTION_MOVE_RIGHT = 'RIGHT'; //39
const ACTION_MOVE_DOWN  = 'DOWN';  //40

const GAME_STATE_SCROLL_LEFT_ON    = 137;
const GAME_STATE_SCROLL_LEFT_OFF   = 237;
const GAME_STATE_SCROLL_UP_ON      = 138;
const GAME_STATE_SCROLL_UP_OFF     = 238;
const GAME_STATE_SCROLL_RIGHT_ON   = 139;
const GAME_STATE_SCROLL_RIGHT_OFF  = 239;
const GAME_STATE_SCROLL_DOWN_ON    = 140;
const GAME_STATE_SCROLL_DOWN_OFF   = 240;

const GAME_STATE_PAUSED  = 0;
const GAME_STATE_RUNNING = 1;
/*
const GAME_STATE_INIT=0;
const GAME_STATE_WAIT_FOR_LOAD=10;
const GAME_STATE_TITLE=20;
const GAME_STATE_NEW_GAME=30;
const GAME_STATE_WAIT_FOR_PLAYER_MOVE=40;
const GAME_STATE_ANIMATE_PLAYER=50;
const GAME_STATE_EVALUATE_PLAYER_MOVE=60;
const GAME_STATE_ENEMY_MOVE=70;
const GAME_STATE_ANIMATE_ENEMY=80;
const GAME_STATE_EVALUATE_ENEMY_MOVE=90;
const GAME_STATE_EVALUATE_OUTCOME=100;
const GAME_STATE_ANIMATE_EXPLODE=110;
const GAME_STATE_CHECK_FOR_GAME_OVER=120;
const GAME_STATE_PLAYER_WIN=130;
const GAME_STATE_PLAYER_LOSE=140;
const GAME_STATE_GAME_OVER=150;
*/

function StateMachine(){   
    
    this.CheckState = function(){
        //Input.Check();        
    } 
    
    this.Direction;
    this.Scroll;
    // this.Pause;
	
    this.multiline = new Array();
    
    
    this.SwitchGameState = function(){}
    
    this.ScrLock = function(){
        for(i in this.Scroll){
            if(this.Scroll[i] == OFF) return true;
        }
        return false;
    }
       
}