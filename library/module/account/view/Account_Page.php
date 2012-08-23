<?php
/**
 * Laika_Account_Page class.
 * 
 * @extends Laika_Abstract_Page
 */
class Laika_Account_Page extends Laika_Abstract_Page{

	protected static $instance;

    /**
     * add_component function.
     * 
     * @access public
     * @param string $component
     * @return string
     */
    public function add_component($component){
        $class_name = __CLASS__;
        $page_name  = str_replace(NAME_SPACE,"", $class_name,$count = 1); 
                
        if($component == "DEFAULT")
            $page_name = str_replace('_Page',"_Component",$page_name,$count = 1);             
        else           
            $page_name = str_replace('_Page','_'.ucfirst(strtolower($component)).'_Component',$page_name,$count = 1);
        return dirname(__FILE__).'/'.$page_name.'.php';        
    }
}