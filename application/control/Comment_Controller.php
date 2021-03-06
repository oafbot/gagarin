<?php
class Gagarin_Comment_Controller extends Laika_Abstract_Page_Controller {

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
	
	public function default_action(){ $this->pagination(); }
	
	public function add(){
	   $comment = new Gagarin_Comment();
	   $user = Laika_User::load($_REQUEST['user']);
	   
	   $comment->user = $_REQUEST['user'];
	   $comment->parent_type = $_REQUEST['parent_type'];
	   $comment->parent_id   = $_REQUEST['parent_id'];
	   $comment->comment     = $_REQUEST['comment'];
	   $comment->user_link   = '<a href="'.HTTP_ROOT.'/user/'.$user->username.'" >'.$user->username.'</a>';
	   
	      
	   Gagarin_Comment::add($comment);
	   
	   $json = array('new_comment'=>$comment->comment,'user_link'=>$comment->user_link);
	   echo json_encode($json);
	}
	
	public function delete(){
	   Gagarin_Comment::delete(Gagarin_Comment::load($_POST['id']));
	}
	
	public function pagination(){
	   $page = $this->parameters['p'];
	   $json = array('page'=>$page);
	   echo json_encode($json);
	}
}
