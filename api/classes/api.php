<?php

    abstract class API {
        
        protected $args = array();
        protected $endpoint = "";
        protected $verb = "";
        
        public function __construct($r){
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: *");
            header("Content-Type: application/json");
            
            $this->args = explode("/",rtrim($r,"/"));
            $this->endpoint = array_shift($this->args);
            if(array_key_exists(0,$this->args & !is_numeric($this->args[0]))){
                $this->verb = array_shift($this->args);
            }
            
            $this->method = $_SERVER["REQUEST_METHOD"];
            
            if($this->method == "POST" && array_key_exists("HTTP_X_HTTP_METHOD", $_SERVER)){
                if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'DELETE') {
                    $this->method = 'DELETE';
                } else if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'PUT') {
                    $this->method = 'PUT';
                } else {
                    throw new Exception("Unexpected Header");
                }
            }
            
            switch($this->method){
                case "POST":
                    $this->r = $this->sanitize($_POST);
                    break;
                default:
                    $this->response('METHOD NOT ALLOWED',405);
                    break;
            
            }
        }
        
        public function process(){
            if(method_exists($this, $this->endpoint)){
                return $this->response($this->{$this->endpoint}($this->args));
            }
            return $this->response("NO ENDPOINT: $this->endpoint" ,404);
        }
        
        private function response($r,$status = 200){
            header("HTTP/1.1 ".$status." ".$this->http($status));
            return json_encode($r);
        }
        
        private function sanitize($r){
            $input = array();
            if(is_array($r)){
                foreach($r as $key=>$val){
                    $input[$key] = $this->sanitize($val);
                }
            } else {
                $input = trim(strip_tags($r));
            }
            return $input;
        }
        
        private function http($s){
            $status = array(
                200 => 'OK',
                404 => 'NOT FOUND',
                405 => 'METHOD NOT ALLOWED',
                500 => 'INTERNAL SERVER ERROR'
            );
            return ($status[$s]) ? $status[$s] : $status[500];
        }
        
    }
?>