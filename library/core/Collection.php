<?php
class Laika_Collection extends ArrayObject{

    public function __construct(){        
        $args = func_get_args();
        if(isset($args)):
            foreach($args as $key => $arg):
                /**
                * Is it a Collectable Object?
                */
                if(is_a($arg,'Laika_Collectable')):
                    parent::__construct($arg);
                /**
                * Is it an Object?
                */
                elseif(is_object($arg)):
                    $obj = new Laika_Collectable($arg);
                    parent::__construct($obj);
                /**
                * Is it an array of Objects?
                */
                elseif(is_array($arg)):
                    foreach($arg as $k => $v):
                        if(!is_a($v,'Laika_Collectable') && is_object($v))
                            $arg[] = Laika_Collectable($v);
                        elseif(!is_object($v))
                            throw new Laika_Exception('INVALID_DATA_TYPE',800);
                    endforeach;
                    parent::__construct($arg);
                /**
                * Otherwise throw Exception.
                */
                else: 
                    throw new Laika_Exception('INVALID_DATA_TYPE',800);
                endif;
            endforeach;
        else:
            parent::__construct();
        endif;                        
    }
    

    public function append($value){
        $this[] = new Laika_Collectable($value);
    }

    

/*
    public function offsetSet($key,$value){
        $this[$key] = new Laika_Collectable($value);
    }
*/

    
    public function __set($key,$value){
        $this->$key = new Laika_Collectable($value);    
    }
    
    public function __get($key){
        return $this->offsetGet($key)->revive();
    }
    
    public function length(){
        return $this->count();
    }
    
    /**
     * pop function.
     * 
     * @access public
     * @return void
     */
    public function pop(){
        $array = (Array)$this;
        $pop = array_pop($array);
        $count = $this->count();
        unset($this[$count-1]);
        return $pop->revive();
    }

    /**
     * shift function.
     * 
     * @access public
     * @return void
     */
    public function shift(){
        $array = (Array)$this;
        $shift = array_shift($array);
        $count = $this->count();
        unset($this[0]);
        return $shift->revive();
    }

    /**
     * push function.
     * 
     * @access public
     * @param Laika_Collectable $object
     * @return void
     */
    public function push($object){
        $this[] = new Laika_Collectable($object);
    }

    /**
     * flush function.
     * 
     * @access public
     * @return void
     */
    public function flush(){
        $array = (Array)$this;
        $this->destroy();
        return $array;
    }

    /**
     * destroy function.
     * 
     * @access public
     * @return void
     */
    public function destroy(){
        $count = $this->count();
        for($i=0;$i<$count;$i++)
            unset($this[$i]);      
    }
}