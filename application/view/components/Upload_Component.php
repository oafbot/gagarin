<?php 
if(!empty($_FILES) && isset($_FILES)):
        
    Laika_Event_Handler::init()->attach(
        Laika_Event_Listener::init("UPLOAD_SUCCESS","Gagarin_Upload_Controller","upload_handler") );
    
    Laika_Event_Handler::init()->attach(
        Laika_Event_Listener::init("UPLOAD_ERROR","Gagarin_Upload_Controller","upload_handler") );
    
    $file = new Laika_File();
    $file->upload($_FILES,MEDIA_DIRECTORY.'/'.Laika_User::active()->username);

endif;

self::render('upload');