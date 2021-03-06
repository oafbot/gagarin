<?php
/**
 * Gagarin_User_Controller class.
 * 
 * @extends Laika_User_Controller
 */
class Gagarin_User_Controller extends Laika_User_Controller{

    protected static $instance;
    protected        $parameters;
    public    static $access_level = 'PRIVATE';
    public    static $access_group = 'USER';
    public    static $caching      = TRUE;

    protected        $submenu      = USER_MENU;
    

    public function default_action(){
        $this->display(array(
        "page"=>Laika_User::active()->username(),
        "user"=>Laika_User::active()->id(),
        "submenu"=>unserialize($this->submenu)
        ));                 
    }    
    
    public function gallery(){}
    
    public function content(){
        $this->display(array(
        "page"=>Laika_User::active()->username(),
        "user"=>Laika_User::active()->id,
        "submenu"=>unserialize($this->submenu),
        "component"=>"content",
        "media"=>$this->parameters['src']
        ));
    }

    /**
     * __call function.
     * 
     * @access public
     * @param mixed $name
     * @param mixed $arg
     * @return void
     */
    public function __call($name,$arg){
        $user = Laika_User::find('username',$name);
        $id = $user->id();
        if(isset( $id ))
            $this->display(array("user"=>$id,"page"=>$user->username,"submenu"=>unserialize($this->submenu)));
        else
            $this->display(array("alert"=>"User not found","alert_type"=>"warning"));
    }
    
    /**
     * itemize function.
     * 
     * @access public
     * @return void
     */
    public function itemize(){
        
        $_SESSION['User_offset']=NULL;
        
        if(!isset($this->parameters['show']))
            $this->parameters['show'] = 20;
        
        switch($this->parameters['show']):
            case 'all':
                $users = Laika_User::paginate();
                break;
            default:
                $users = Laika_User::paginate($this->parameters['show']);
                break;
        endswitch;        
         
        foreach($users as $k => $user)                            
            foreach( Laika_User::accessible() as $k2 => $v ) 
                $response[$k][$k2] = $user->get_property($k2);
        
        $this->display(array(
            "component"=>"directory",
            "users"=>$response,
            "submenu"=>unserialize($this->submenu)));
    }    
}