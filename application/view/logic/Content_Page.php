<?php
class Gagarin_Content_Page extends Laika_Abstract_Page{

	protected static $instance;


    public function fullscreen(){
        $media = self::init()->media;        
        echo Laika_Image::api_path( $media->path, 'constrain', '800x600' ); 
    }

}