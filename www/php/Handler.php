<?php
    
    require('../../php/Config.php');
    
    if(defined(IS_DEBUG) AND IS_DEBUG){
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
        echo "<!--DEBUG ON-->";
    }
    
    include(PHP_DIR."/Processor.php");
?>