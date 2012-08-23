<?php
abstract class Laika_Abstract_Socket_Service extends Laika_Singleton{

    abstract function connect($ocket);
    abstract function disconnect();

}