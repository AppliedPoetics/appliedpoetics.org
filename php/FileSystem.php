<?php

    class ScratchFile{
        private $contents;

        public function __construct($data){
            $this->contents = rawurldecode($data);
        }

        public function Name(){
            return TEXT_DIR.substr(md5(rand()),0,4);
        }

        public function Save(){
            $filename = self::Name();
            $file = fopen($filename,"w");
            fwrite($file,utf8_decode($this->contents));
            fclose($file);
            return $filename;
        }

        public function Remove($filename){
            unlink($filename);
        }
    }
?>
