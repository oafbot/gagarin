<?php
/**
 * Gagarin_Login_Controller class.
 * 
 * @extends Laika_Login_Controller
 */
class Gagarin_Login_Controller extends Laika_Login_Controller{

    protected static $instance;
    protected        $parameters;
    public    static $access_level = 'PUBLIC';
    public    static $access_group = 'USER'; 
    public    static $caching      = TRUE;
    
    public function authenticate(){
        isset($_POST['user']) ? $user = $_POST['user'] : $user = NULL;
        isset($_POST['password']) ? $pass = $_POST['password'] : $pass = NULL;
        parent::authenticate($user,$pass);
    }
}