<?php
    include('Controller.php');
    include('FileSystem.php');
    /*
     * Controller.php methods
     *
     * Routing
     * Parameters
     * Legacy
     * Text
     * Command
     *
     */
    $request = new Controller($_POST);
    $resource = new ScratchFile($_POST['text']);
    if($request->Routing()){
        $filename = $resource->Save();
        if(defined('IS_DEBUG') && IS_DEBUG){
            echo $request->Command($filename);
        }
        $output = shell_exec($request->Command($filename));
        echo $output;
        $resource->Remove($filename);
    }
?>
