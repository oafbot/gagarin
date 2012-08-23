<?php
class Gagarin_About_Controller extends Laika_Abstract_Page_Controller{

    protected static $instance;
    protected        $parameters;
    public    static $access_level = 'PUBLIC';
    public    static $caching      = TRUE;
    
    
    public function default_action(){ $this->display(array("page"=>"about")); }    
}