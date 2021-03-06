<!DOCTYPE html>
<html lang="en">
<head>
    <title><? echo APPLICATION_TITLE; ?></title>
    <link rel="shortcut icon" href="<? echo HTTP_ROOT; ?>/images/favicon.ico" type="image/x-icon" />
    
    <? self::render('meta');     ?>
    <? self::render('masthead'); ?>
    
    <? self::styles('js/jquery-ui/css/smoothness/jquery-ui-1.8.16.custom',
                    'reset','common','layout','forms','buttons','ui-elements'); ?>  

    <? self::render('javascript'); ?>
    <? self::scripts('jquery','jquery.preload','jquery-ui/js/jquery-ui','shared'); ?>
    
</head>
<body>
    <div id="main">
        <? self::render('header'); ?>
        <? self::render('navbar'); ?>
        <? self::render('subnav'); ?>
        <? self::render_alert();     ?>
        <? self::render_component(); ?> 
    </div>
    <? self::render('footer'); ?>
</body>
</html>