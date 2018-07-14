<?php
    class Controller{
        private $obj;
        private $interpreter;
        private $ext = array(
            "julia" => "jl",
            "perl" => "pl",
            "python" => "py",
            "ruby" => "rb"
        );
        private $flags = array(
            "gran" => "g",
            "param" => "p",
            "chars" => "c",
            "text" => "t"
        );

        public function __construct($data){
            $this->obj = $data;
        }
        
        public function Routing(){
            $path;
            if(self::Legacy()){
                $path = self::Legacy();
            } else {
                $path = "julia";
            }
            $this->interpreter = $path;
            $path = "../".$path."/".$this->obj['cmd'].".".$this->ext[$path];
            return $path;
        }
        
        public function Parameters($filename){
            $parameters = array(
                "param" => (string)$this->obj['param'],
                "gran" => (int)$this->obj['granular'],
                "chars" => (int)$this->obj['outwords'],
                "text" => (string)$filename
            );
            return $parameters;
        }
        
        public function Legacy(){
            $legacy = array(
                "travesty" => "perl"
            );
            return $legacy[$this->obj['cmd']];
        }
        
        public function Command($filename){
            $path = self::Routing();
            $params = self::Parameters($filename);
            $cmd = $this->interpreter." ".$path;
            foreach($params as $key=>$val){
                if($val){
                    $cmd .= " -".$this->flags[$key]." ".$val;
                }
            }
            return $cmd;
        }
    }
?>