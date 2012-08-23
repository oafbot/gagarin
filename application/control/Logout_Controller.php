<?php
/**
 * Gagarin_Login_Controller class.
 * 
 * @extends Laika_Login_Controller
 */
class Gagarin_Logout_Controller extends Laika_Login_Controller{

    protected static $instance;
    protected        $parameters;
    public    static $access_level = 'PUBLIC';
    public    static $access_group = 'USER'; 
    public    static $caching      = TRUE;
    
    public function default_action(){ parent::terminate(); }
}