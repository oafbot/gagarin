<?php
class Gagarin_Favorite_Controller extends Laika_Abstract_Page_Controller {

//-------------------------------------------------------------------
//	PROPERTIES
//-------------------------------------------------------------------

    protected static $instance;
    protected        $parameters;
    public    static $access_level = 'PUBLIC';
    public    static $access_group = 'USER';
    public    static $caching      = FALSE;

//-------------------------------------------------------------------
//	METHODS
//-------------------------------------------------------------------
	
	public function default_action(){ $this->display(array("page"=>" ")); }
	
    /**
     * favorite function.
     * 
     * @access public
     * @return void
     */
    public function favorite(){
        $id = $this->parameters['id'];
        $success = Gagarin_Favorite::mark($id);
        echo json_encode($success);
    }
    
    /**
     * unfavorite function.
     * 
     * @access public
     * @return void
     */
    public function unfavorite(){        
        $id = $this->parameters['id'];        
        $success = Gagarin_Favorite::undo(Gagarin_Favorite::find('item',$id));
        echo json_encode($success);
    }  
}