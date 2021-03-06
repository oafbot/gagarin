<?php
/**
 *
 *	LAIKA FRAMEWORK -- User Configuration File
 *
 *	Framework   Version 0.1.0 Development
 *	Application Version 0.3.0 Development
 *
 *
 *	@filesource 	conf.php
 *	@version    	0.1.0b
 *	@package    	laika
 *	@subpackage     kernel
 *	@category       config file
 *	@date       	010-01-18 01:59:19 -0500 (Mon, 18 Jan 2010)
 *	@author     	Leonard M. Witzel <witzel@post.harvard.edu>
 *
 *	Copyright (c) 2010 Harvard University <http://lab.dce.harvard.edu>
 *
 */


//-------------------------------------------------------------------
//	DEVELOPMENT ENVIRONMENT SWITCH
//-------------------------------------------------------------------
    
    define( 'DEVELOPMENT_ENVIRONMENT', true );
        
               
//-------------------------------------------------------------------
//	DATABASE CONFIGURATION
//-------------------------------------------------------------------
    
    define( 'DB_TYPE', 'mysql'      );
    define( 'DB_NAME', 'gagarin_db'  );
    define( 'DB_PASS', 'gagarin'     );
    define( 'DB_USER', 'gagarin_user');
    define( 'DB_HOST', 'localhost'  );
    define( 'DB_PORT',  3306        );
    define( 'USE_PDO',  true        ); // set to false to specify specific wrapper class
        
//-------------------------------------------------------------------
//	HOST & APPLICATION URI
//-------------------------------------------------------------------
    
    define( 'FORCE_SSL',     false  );
    define( 'DEFAULT_ROUTE', 'home' );   
    
    
//-------------------------------------------------------------------
//	APPLICATION SETTINGS
//-------------------------------------------------------------------

    define( 'APPLICATION_TITLE',     'Gagarin'          );
    define( 'CODE_NAME',             'Gagarin'          ); // Application Namespace Tag
    define( 'TIME_ZONE',             'America/New_York' );
    define( 'MAX_FILE_SIZE',         1073741824         ); //1G in Bytes: Set php.ini appropriately    
    
//-------------------------------------------------------------------
//	ACCESS PRIVILEGES
//-------------------------------------------------------------------

    define( 'REQUIRE_LOGIN',   false     ); // Override "PUBLIC" access_levels and force login sitewide.
/*
    define( 'RESTRICT_ACCESS', 'PUBLIC'  ); // PUBLIC or SUBNET
    define( 'SUBNET',          'CLASS_C' ); // CLASS_A: first octet, CLASS_B: 2 octets, CLASS_C: 3 octets
*/ 
    
    define ('ADMIN_EMAIL', 'Leonard Witzel<witzel@post.harvard.edu>');
    
    define( 'PAGINATION_LIMIT', 10 );
    define( 'DEFAULT_LOGIN_REDIRECT', '/user' );
    define( 'CACHE_PAGES', false );
    define( 'OB_HANDLER',  'ob_gzhandler'   ); // 'ob_gzhandler' , 'ob_tidyhandler' , NULL