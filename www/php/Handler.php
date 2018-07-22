<?php
    require('../../php/Config.php');
    if(defined(IS_DEBUG) AND IS_DEBUG){
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
        echo "<!--DEBUG ON-->";
    }
    if(AJAX_RQ AND IS_SELF){
        include(PHP_DIR."/Processor.php");
    } else {
        header("Location: ../404.php");
    }
?>