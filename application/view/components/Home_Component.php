<? self::scripts('gagarin/modernizr','gagarin/main','gagarin/game','gagarin/map','gagarin/state','gagarin/input','gagarin/sprite'); ?>
<?php
    $user  = self::init()->get_user();
    $title = self::init()->get_title();
?>
<!-- <div id="container"> -->
    <div id="screen">
        <canvas id="canvas" width="800" height="480">
            Your browser does not support HTML5 Canvas.
        </canvas>
    </div>
<!-- </div> -->

            
