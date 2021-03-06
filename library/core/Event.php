<?php
class Laika_Event extends Laika_Singleton{

//-------------------------------------------------------------------
//	PROPERTIES
//-------------------------------------------------------------------

    protected static $instance;

//-------------------------------------------------------------------
//	METHODS
//-------------------------------------------------------------------

    public static function dispatch($event,$param){               
        self::log(func_get_args());
        Laika_Event_Handler::init()->handle($event,$param);    
    }
    
    public static function log($trace){
        $trace[] = date("D M j G:i:s T Y");
        $trace[] = microtime();
        //FirePHP::getInstance(true)->log($trace, 'Trace');
    }
}