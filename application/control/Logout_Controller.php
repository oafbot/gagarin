<?php
/**
 * GAGARIN_Login_Controller class.
 * 
 * @extends LAIKA_Login_Controller
 */
class GAGARIN_Logout_Controller extends LAIKA_Login_Controller{

    protected static $instance;
    protected        $parameters;
    public    static $access_level = 'PUBLIC';
    public    static $access_group = 'USER'; 
    public    static $caching      = TRUE;
    
    public function default_action(){ parent::terminate(); }
}