<?php
/**
 * Laika_Active_User class.
 *
 * Class representing the user currently logged in.
 * A Singleton representation of the User Model Class.
 * 
 * @extends Laika_Abstract_Singleton_Model
 */
class Laika_Active_User extends Laika_Abstract_Singleton_Model{

//-------------------------------------------------------------------
//	PROPERTIES
//-------------------------------------------------------------------

    protected static $instance;
    protected        $model;
    protected        $table;
    protected        $accessibles = array('username','email','firstname','lastname','logged_in');
        
    protected        $id;
    protected        $username;
    protected        $password;
    protected        $salt;
    protected        $email;
    protected        $level;
    protected        $firstname;
    protected        $lastname;
    protected        $logged_in;

    protected        $created;
    protected        $updated;
    
//-------------------------------------------------------------------
//	METHODS
//-------------------------------------------------------------------

    /**
     * init function.
     * 
     * @access public
     * @static
     * @return object
     */
    public static function init(){       
        parent::init();
        self::$instance->model = 'Active_User';
        self::$instance->table = 'users';
        return self::$instance;    
    }

    /**
     * bind function.
     * 
     * @access public
     * @static
     * @param int $id
     * @return void
     */
    public static function bind($id){
        Laika_Active_Session::unregister($id,false);
        $user = self::load($id);
        Laika_Registry::register('Active_User',$user);
        Laika_Active_Session::register($id);
    }

    /**
     * active function.
     * 
     * @access public
     * @static
     * @return Active_User Object
     */
    public static function active(){
        if(Laika_Registry::peek('Active_User'))
            self::$instance = Laika_Registry::get_record('Active_User');            
        elseif( isset($_SESSION['PREVIOUS_TOKEN']) ) 
            self::$instance = self::wake_up();
        else self::init();
        
        return self::$instance;            
    }
    
    /**
     * wake_up function.
     * 
     * @access public
     * @static
     * @return Active_User Object
     */
    public static function wake_up(){
        $id = Laika_Active_Session::find_user($_SESSION['PREVIOUS_TOKEN']);
        self::bind($id);
        return Laika_Registry::get_record('Active_User');
    }
    
    /**
     * sleep function.
     * 
     * @access public
     * @static
     * @return void
     */
    public static function sleep(){
        $user = self::active();
        $id = $user::get('id');
        Laika_Active_Session::unregister($id,true);    
    }
    
    public static function deactivate(){}
    
    /**
     * name function.
     * 
     * @access public
     * @return string
     */
    public function name(){
        if(func_num_args()==0)
            $user = self::init();
        else
            $user = self::load(func_get_arg(0));
        return $user->firstname." ".$user->lastname;
    }
    
    /**
     * activated function.
     * 
     * @access public
     * @return void
     */
    public static function valid_account(){
        $account = Laika_Account::find('user',self::init()->id);
        if(!$account->confirmed() || $account->deactivated())
            return false;
        return true;
    }
    
    /**
     * account function.
     * 
     * @access public
     * @return void
     */
    public function account(){
        return Laika_Account::find('user',self::init()->id);
    }
    
    /**
     * logged_in function.
     * 
     * @access public
     * @return void
     */
    public function logged_in(){        
        if(func_num_args()>0)          
            return $this->dset('logged_in', func_get_arg(0));
        return $this->dset('logged_in', true);
    }   

    /**
     * avatar function.
     * 
     * @access public
     * @param mixed $size
     * @return void
     */
    public function avatar($size){
        $link = '<a href="'.HTTP_ROOT.'/user/'.$this->username.'" >';
        return $link.Laika_Avatar::img(self::init()->email,$size).'</a>';
    }                            
}