<?php

/**
 * Laika_Access class.
 * 
 * Basic layer access class.
 * This class should be agnostic of User and Login classes and modules.
 *
 * @extends Laika_Singleton
 */
class Laika_Access extends Laika_Singleton{

//-------------------------------------------------------------------
//	VARIABLES
//-------------------------------------------------------------------

    protected static $instance;
    private          $token;
    private          $logged_in;        
    
//-------------------------------------------------------------------
//	METHODS
//-------------------------------------------------------------------
    /**
     * init function.
     * 
     * @access public
     * @static
     * @return void
     */
    public static function init(){    
        if( empty(self::$instance) )      
            if( Laika_Registry::peek(__CLASS__) )                 
                self::$instance = Laika_Registry::get_record(__CLASS__);
            else
                parent::init();
        Laika_Registry::register(__CLASS__,self::$instance); 
        return self::$instance;    
    }

    /**
     * configure function.
     * 
     * @access public
     * @return void
     */
    public function configure(){
        if( isset($_COOKIE['Laika_SESSION']) ){            
            $this->logged_in = true;
            $this->token = SESSION_TOKEN;

            if(!isset($_SESSION['PREVIOUS_TOKEN']))
                $_SESSION['PREVIOUS_TOKEN'] = $_COOKIE['Laika_SESSION'];                       
            
            if($_COOKIE['Laika_SESSION'] != $this->token)
                setcookie('Laika_SESSION', $this->token, time() + 31536000, '/');

            Laika_Registry::set_record(__CLASS__,self::$instance);
        }
        if( isset($this->token) )
            $_SESSION['LOGIN_TOKEN']= $this->token;
        else $_SESSION['LOGIN_TOKEN']= NULL;
    }
    
    /**
     * grant_access function.
     * 
     * @access public
     * @return void
     */
    public function grant_access(){
        $this->token = SESSION_TOKEN;
        $this->logged_in = true;
        Laika_Registry::set_record(__CLASS__,self::$instance);
        $_SESSION['LOGIN_TOKEN']=$this->token;
        if (!isset($_COOKIE['Laika_SESSION']))
            setcookie('Laika_SESSION', $this->token, time() + 31536000, '/');
        
        Laika_Event::dispatch('ACCESS_GRANTED',__FILE__);
    }
    
    /**
     * destroy_session function.
     * 
     * @access public
     * @return void
     */
    public function destroy_session(){
        unset($_SESSION['LOGIN_TOKEN']);
        self::$instance = Laika_Registry::unregister(__CLASS__);
        setcookie('Laika_SESSION', " ", time()-3600, '/');
        $_SESSION['REDIRECT']=NULL;
        Laika_Controller::process(new Laika_Command('DATABASE','DISCONNECT',NULL));        

        Laika_Event::dispatch('TERMINATE_SESSION',__FILE__);        
    }
    
    /**
     * is_logged_in function.
     * 
     * @access public
     * @static
     * @return void
     */
    public static function is_logged_in(){
        return self::init()->logged_in;
    }
}