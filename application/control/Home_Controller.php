<?php
/**
 *	LAIKA FRAMEWORK Release Notes:
 *
 *	@filesource     Home_Controller.php
 *
 *	@version        0.1.0b
 *	@package        GAGARIN
 *	@subpackage     control
 *	@category       control
 *	@date           2011-05-21 03:37:00 -0400 (Sat, 21 May 2011)
 *
 *	@author         Leonard M. Witzel <witzel@post.harvard.edu>
 *	@copyright      Copyright (c) 2011  Laika Soft <{@link http://oafbot.com}>
 *
 */
/**
 * GAGARIN_Home_Controller class.
 * 
 * @extends LAIKA_Abstract_Page_Controller
 */
class GAGARIN_Home_Controller extends LAIKA_Abstract_Page_Controller{

    protected static $instance;
    protected        $parameters;
    public    static $access_level = 'PUBLIC';
    public    static $caching      = TRUE;
    
    /**
     * default_action function.
     * 
     * @access public
     * @return void
     */
    public function default_action(){ $this->display(array("page"=>"gagarin")); }

}