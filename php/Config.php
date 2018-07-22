<?php
    define('PHP_DIR',__DIR__);
    define('EXEC_DIR','/opt/appliedpoetics.org/');
    define('TEXT_DIR','/opt/appliedpoetics.org/scratch/');
    define('IS_DEBUG',FALSE);
    define('AJAX_RQ',strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' ? TRUE : FALSE);
    define('IS_SELF',strpos($_SERVER['HTTP_REFERER'],getenv('HTTP_HOST')) ? TRUE : FALSE);
?>