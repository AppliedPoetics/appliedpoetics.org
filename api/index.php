<?php
    require_once('classes/api.php');
    
    class Gantry extends API{
        
        public function __construct($r,$origin){
            parent::__construct($r);
        }
        
        protected function endpoint(){
            if($this->method == "POST"){
                return "POST ACCEPTED.";
            } else {
                return "ONLY ACCEPTS POST REQUESTS.";
            }
        }
    }
    
    if(!array_key_exists('HTTP_ORIGIN',$_SERVER)){
        $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
    }
    
    try{
        $API = new Gantry($_REQUEST['r'], $_SERVER['HTTP_ORIGIN']);
        echo $API->process();
    } catch (Exception $e) {
        echo json_encode(Array("error" => $e->getMessage()));
    }
    
?>