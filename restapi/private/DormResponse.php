<?php

use Psr\Http\Message\ResponseInterface as Response;

class DormResponse {
    public $message;
    public $error;
    public $warning;
    public $status;

    public $headers = [];

    public function __construct($message = '', $error = '', $warning = '', $status = 200) {
        $this->message = $message;
        $this->error = $error;
        $this->warning = $warning;
        $this->status = $status;
        //        default headers
        $this->headers[] = ['header_name' => 'Content-Type', 'header_value' => 'application/json'];
        $this->headers[] = ['header_name' => 'Access-Control-Allow-Origin', 'header_value' => '*'];
        $this->headers[] = ['header_name' => 'Access-Control-Allow-Headers', 'header_value' => 'X-Requested-With, Content-Type, Accept, Origin, Authorization'];
        $this->headers[] = ['header_name' => 'Access-Control-Allow-Methods', 'header_value' => 'GET, POST, PUT, DELETE, PATCH, OPTIONS'];
    }

    public function getObject() {
        return ['msg' => $this->message, 'err' => $this->error, 'warn' => $this->warning];
    }

    public function getResponse() {
        return json_encode($this->getObject());
    }

    public function answer(Response $response) {
        $response = $response->withStatus($this->status);
        foreach ($this->headers as $header) {
            $response = $response->withHeader($header['header_name'], $header['header_value']);
        }
        $response->getBody()->write($this->getResponse());
        return $response;
    }
}