<?php
/**
 *	LAIKA FRAMEWORK Release Notes:
 *
 *	@filesource 	Engine.php
 *
 *	@version    	0.1.0b
 *	@package    	laika
 *	@subpackage 	kernel
 *	@category   	engine
 *	@date       	2010-01-18 02:29:45 -0500 (Mon, 18 Jan 2010)
 * 
 *	@author     	Leonard M. Witzel <witzel@post.harvard.edu>
 *	@copyright  	Copyright (c) 2010 Harvard University <{@link http://lab.dce.harvard.edu}>
 *
 */
/**
 * LaikaEngine class.
 * 
 * Framework Engine
 * 
 * @extends Laika
 * @final 
 */
 
final class Laika_Engine{

//-------------------------------------------------------------------
//	CONSTANTS & VARIABLES
//-------------------------------------------------------------------

	private static $instance;
	//const BOOT_FLAG;
	
//-------------------------------------------------------------------
//	CONSTRUCTOR
//-------------------------------------------------------------------    
    /**
    * __construct function.
    * 
    * @access public
    * @return void
    */
    private final function __construct(){}
        
    /**
    * init function.
    * 
    * @access public
    * @static
    * @return void
    */    
    public static function init(){
    
      	session_start();
    	require_once('../config/user.conf.php');
    	require_once('../config/system.conf.php');    	
    	
    	if( empty( self::$instance ) ){			
            
            self::$instance = new self();
    		self::$instance-> boot();
    		self::$instance-> configure();
    	}	
        return self::$instance;
    }

//-------------------------------------------------------------------
//	METHODS
//-------------------------------------------------------------------   
    /**
    * boot function.
    * 
    * @access private
    * @return void
    */
    private function boot(){
    	
        require_once('../library/kernel/Bootstrap.php');      
        Laika_Bootstrap::execute();                    
    }
        
    /**
    * configure function.
    * 
    * Set exception and error handling, database, and access configurations. 
    *
    * @access public
    * @return void
    */
    private function configure(){
    	
    	// Set exception handler:
        set_exception_handler(array(Laika_Exception_Handler::init(),'handle'));
    	// Attach a new observer:
    	Laika_Exception_Handler::init()->attach(new Laika_Exception_Logger());
    	
    	// Set error handler:
    	set_error_handler(array(Laika_Error::init(),'error_handler'),E_ALL);
    	
    	// Set event handler
        // INSTANTIATE EVENT LISTENER:
    	//Laika_Event_Handler::init()->attach(Laika_Event_Listener::init());
    	    	
        // Establish Database Connection:
    	Laika_Controller::process(new Laika_Command('DATABASE','CONNECT',DB_TYPE));
        
        // CHECK ACCESS PRIVILEGES:		    	
    	Laika_Controller::process(new Laika_Command('ACCESS','CONFIGURE', NULL));
    	 				
    	// Initiate hooks, activate plugins:
    	//Laika_Controller::process(new Laika_Command('PLUGINS','HOOK', NULL));    					
    }
         
    /**
    * execute function.
    * 
    * Send request to router class via main controller. 
    *
    * @access public
    * @return void
    */
    public function execute($uri){
    		     	 		    	
        Laika_Event::dispatch('URL_REQUEST',$uri);
        Laika_Controller::process(new Laika_Command('ROUTER','REDIRECT',$uri));  
    }
            
}