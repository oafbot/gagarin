<?php
class Gagarin_Comment extends Laika_Abstract_Model{

//-------------------------------------------------------------------
//	PROPERTIES
//-------------------------------------------------------------------

    protected        $model;
    protected        $table;
	
	protected		 $id;
	protected        $user;
	protected        $parent_type;
	protected        $parent_id;
	protected        $comment;
    protected        $created;
    protected        $updated;

//-------------------------------------------------------------------
//	METHODS
//-------------------------------------------------------------------

    public function is_owner(){
        if(Laika_Access::is_logged_in())
            if($this->user == Laika_User::active()->id)
                return true;
        return false;
    }

}