<?php
class Gagarin_Favorite extends Laika_Abstract_Singleton_Model{

//-------------------------------------------------------------------
//	PROPERTIES
//-------------------------------------------------------------------

    protected static $instance;
    protected        $model;
    protected        $table;
	
	protected		 $id;
    protected        $item;
    protected        $user;
    protected        $type;

    protected        $created;
    protected        $updated;

//-------------------------------------------------------------------
//	METHODS
//-------------------------------------------------------------------

    public static function mark($item,$type="media"){
        
        if(!Laika_Access::is_logged_in()) return array('login'=>false);
        
        $favorite = self::init();
        $favorite->user = Laika_User::active()->id;
        $favorite->item = $item;
        $favorite->type = $type;        
        
        if($favorite->is_favorite($favorite->user,$item,$type))
            return array('favorited'=>false,'login'=>true);
        
        Laika_Database::add($favorite);
        return array('favorited'=>true,'login'=>true);  
    }

    public static function undo($object){
        
        if(!Laika_Access::is_logged_in()) 
            return array('login'=>false);
        
        parent::delete($object);
        return array('unfavorited'=>true,'login'=>true);
    }
    
    public function is_favorite($user,$item,$type){
        $result = Laika_Database::query("SELECT item FROM favorites WHERE user = $user AND item = $item",'SINGLE');
        if(!isset($result) || empty($result))
            return false;
        return true;
    }
        
}